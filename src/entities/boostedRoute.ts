import invariant from 'tiny-invariant';
import JSBI from 'jsbi';
import { BoostedToken } from './boostedToken';
import { Currency } from './Currency';
import { Pool } from './pool';
import { Price } from './Price';
import { Token } from './Token';
import { isBoostedToken } from '../utils/isBoostedToken';

/**
 * Represents a list of pools through which a boosted swap can occur
 * Supports wrapping/unwrapping logic for BoostedTokens (ERC4626)
 */
export class BoostedRoute<TInput extends Currency, TOutput extends Currency> {
  public readonly pools: Pool[];
  public readonly tokenPath: (Token | BoostedToken)[];
  public readonly input: TInput;
  public readonly output: TOutput;
  public readonly isBoosted = true as const;

  public constructor(pools: Pool[], input: TInput, output: TOutput) {
    const wrappedInput = input.wrapped;
    const wrappedOutput = output.wrapped;

    // ═══════════════════════════════════════════════════════════
    // CASE 1: DIRECT WRAP (pools.length === 0)
    // Underlying → BoostedToken (e.g., WETH → mwETH)
    // ═══════════════════════════════════════════════════════════
    if (
      pools.length === 0 &&
      isBoostedToken(wrappedOutput) &&
      !isBoostedToken(wrappedInput)
    ) {
      invariant(
        wrappedOutput.underlying.equals(wrappedInput),
        'DIRECT_WRAP: output must wrap input'
      );

      this.pools = pools;
      this.tokenPath = [wrappedInput, wrappedOutput];
      this.input = input;
      this.output = output;
      return;
    }

    // ═══════════════════════════════════════════════════════════
    // CASE 2: DIRECT UNWRAP (pools.length === 0)
    // BoostedToken → Underlying (e.g., mwETH → WETH)
    // ═══════════════════════════════════════════════════════════
    if (
      pools.length === 0 &&
      isBoostedToken(wrappedInput) &&
      !isBoostedToken(wrappedOutput)
    ) {
      invariant(
        wrappedInput.underlying.equals(wrappedOutput),
        'DIRECT_UNWRAP: input must unwrap to output'
      );

      this.pools = pools;
      this.tokenPath = [wrappedInput, wrappedOutput];
      this.input = input;
      this.output = output;
      return;
    }

    // ═══════════════════════════════════════════════════════════
    // CASE 3: BOOSTED ROUTE WITH POOLS
    // Input/Output through boosted pools with wrap/unwrap steps
    // ═══════════════════════════════════════════════════════════
    invariant(
      pools.length > 0,
      'POOLS: routes with pools must have at least one pool'
    );

    const chainId = pools[0].chainId;
    const allOnSameChain = pools.every(pool => pool.chainId === chainId);
    invariant(allOnSameChain, 'CHAIN_IDS');

    const tokenPath: (Token | BoostedToken)[] = [];
    let currentToken: Token | BoostedToken = wrappedInput;

    // Check if we need to wrap input
    const firstPool = pools[0];
    const firstInvolvesBoosted =
      isBoostedToken(firstPool.token0) || isBoostedToken(firstPool.token1);

    if (!isBoostedToken(wrappedInput) && firstInvolvesBoosted) {
      // Find matching boosted token in first pool
      const boosted = [firstPool.token0, firstPool.token1].find(
        t =>
          isBoostedToken(t) &&
          (t as BoostedToken).underlying.equals(currentToken)
      ) as BoostedToken | undefined;

      if (boosted) {
        tokenPath.push(currentToken); // underlying
        tokenPath.push(boosted); // wrapped
        currentToken = boosted;
      } else {
        tokenPath.push(currentToken);
      }
    } else {
      tokenPath.push(currentToken);
    }

    // Build path through pools
    for (const pool of pools) {
      const nextToken = currentToken.equals(pool.token0)
        ? pool.token1
        : pool.token0;
      tokenPath.push(nextToken);
      currentToken = nextToken;
    }

    // Check if we need to unwrap output
    const lastToken = tokenPath[tokenPath.length - 1];
    if (
      isBoostedToken(lastToken) &&
      !isBoostedToken(wrappedOutput) &&
      lastToken.underlying.equals(wrappedOutput)
    ) {
      tokenPath.push(lastToken.underlying);
    }

    this.pools = pools;
    this.tokenPath = tokenPath;
    this.input = input;
    this.output = output;
  }

  private _midPrice: Price<TInput, TOutput> | null = null;

  public get midPrice(): Price<TInput, TOutput> {
    if (this._midPrice !== null) return this._midPrice;

    // ═══════════════════════════════════════════════════════════
    // CASE: DIRECT WRAP/UNWRAP (no pools)
    // Price is 1:1 in terms of value (shares:assets)
    // ═══════════════════════════════════════════════════════════
    if (this.pools.length === 0) {
      // For wrap/unwrap, price should be 1:1 in value terms
      // Example: 1 USDC = 1 sparkUSDC (in value, not in raw units)
      // Raw units: 1e6 USDC = 1e18 sparkUSDC (because of decimal difference)

      // Price = output per input
      // Since value is 1:1, we need: 1 input = 1 output (in terms of decimals)
      // numerator = 10^output.decimals (represents 1 output token in raw units)
      // denominator = 10^input.decimals (represents 1 input token in raw units)

      const numerator = JSBI.exponentiate(
        JSBI.BigInt(10),
        JSBI.BigInt(this.output.decimals)
      );
      const denominator = JSBI.exponentiate(
        JSBI.BigInt(10),
        JSBI.BigInt(this.input.decimals)
      );

      return (this._midPrice = new Price(
        this.input,
        this.output,
        denominator,
        numerator
      ));
    }

    // ═══════════════════════════════════════════════════════════
    // CASE: ROUTES WITH POOLS
    // Calculate price through pool swaps with wrap/unwrap adjustments
    // ═══════════════════════════════════════════════════════════
    let pathIndex = 0;

    // Check if there's a wrap step at the beginning
    const hasWrapAtStart =
      this.tokenPath.length > 1 &&
      !isBoostedToken(this.tokenPath[0]) &&
      isBoostedToken(this.tokenPath[1]);

    if (hasWrapAtStart) {
      pathIndex = 1; // Start from wrapped token
    }

    // Start with first pool price
    const firstPoolToken = this.tokenPath[pathIndex];
    let price = this.pools[0].token0.equals(firstPoolToken)
      ? this.pools[0].token0Price
      : this.pools[0].token1Price;

    pathIndex++;
    let currentToken = this.tokenPath[pathIndex];

    // Apply subsequent pool prices
    for (let i = 1; i < this.pools.length; i++) {
      const pool = this.pools[i];
      if (currentToken.equals(pool.token0)) {
        price = price.multiply(pool.token0Price);
        currentToken = pool.token1;
      } else {
        price = price.multiply(pool.token1Price);
        currentToken = pool.token0;
      }
      pathIndex++;
    }

    // Now we have price in terms of wrapped tokens (e.g., mwETH/sparkUSDC)
    // We need to adjust for wrap/unwrap to get price in terms of underlying tokens (ETH/USDC)

    // Calculate decimal adjustments
    let numeratorAdjustment = JSBI.BigInt(1);
    let denominatorAdjustment = JSBI.BigInt(1);

    // Adjust for input wrap if present
    if (hasWrapAtStart) {
      const underlyingInput = this.tokenPath[0];
      const wrappedInput = this.tokenPath[1] as BoostedToken;
      const decimalDiff = wrappedInput.decimals - underlyingInput.decimals;
      denominatorAdjustment = JSBI.exponentiate(
        JSBI.BigInt(10),
        JSBI.BigInt(decimalDiff)
      );
    }

    // Check if there's an unwrap step at the end
    const lastToken = this.tokenPath[this.tokenPath.length - 1];
    const secondLastToken = this.tokenPath[this.tokenPath.length - 2];
    const hasUnwrapAtEnd =
      isBoostedToken(secondLastToken) && !isBoostedToken(lastToken);

    // Adjust for output unwrap if present
    if (hasUnwrapAtEnd) {
      const wrappedOutput = secondLastToken as BoostedToken;
      const underlyingOutput = lastToken;
      const decimalDiff = wrappedOutput.decimals - underlyingOutput.decimals;
      numeratorAdjustment = JSBI.exponentiate(
        JSBI.BigInt(10),
        JSBI.BigInt(decimalDiff)
      );
    }

    // Apply adjustments to price
    const adjustedNumerator = JSBI.multiply(
      price.numerator,
      denominatorAdjustment
    );
    const adjustedDenominator = JSBI.multiply(
      price.denominator,
      numeratorAdjustment
    );

    return (this._midPrice = new Price(
      this.input,
      this.output,
      adjustedDenominator,
      adjustedNumerator
    ));
  }

  public get chainId(): number {
    if (this.pools.length === 0) {
      // For direct wrap/unwrap, get chainId from input or output
      return this.input.chainId;
    }
    return this.pools[0].chainId;
  }
}
