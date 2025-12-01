import invariant from 'tiny-invariant';
import { AnyToken } from '../types';
import { BoostedToken } from './BoostedToken';
import { Currency } from './Currency';
import { Pool } from './pool';
import { Price } from './Price';

/**
 * Type of operation in a boosted route step
 */
export enum BoostedRouteStepType {
  /** ERC4626 deposit: underlying → shares */
  WRAP = 'WRAP',
  /** ERC4626 redeem: shares → underlying */
  UNWRAP = 'UNWRAP',
  /** AMM swap through pool */
  SWAP = 'SWAP',
}

/**
 * Base properties shared by all step types
 */
interface BoostedRouteStepBase {
  /** Input token for this step */
  tokenIn: AnyToken;
  /** Output token for this step */
  tokenOut: AnyToken;
}

/**
 * WRAP step: ERC4626 deposit (underlying → shares)
 */
export interface BoostedRouteStepWrap extends BoostedRouteStepBase {
  type: BoostedRouteStepType.WRAP;
}

/**
 * UNWRAP step: ERC4626 redeem (shares → underlying)
 */
export interface BoostedRouteStepUnwrap extends BoostedRouteStepBase {
  type: BoostedRouteStepType.UNWRAP;
}

/**
 * SWAP step: AMM swap through pool
 */
export interface BoostedRouteStepSwap extends BoostedRouteStepBase {
  type: BoostedRouteStepType.SWAP;
  /** Pool used for swap (always present for SWAP type) */
  pool: Pool;
}

/**
 * A single step in a boosted route (discriminated union)
 */
export type BoostedRouteStep =
  | BoostedRouteStepWrap
  | BoostedRouteStepUnwrap
  | BoostedRouteStepSwap;

/**
 * Represents a list of pools through which a boosted swap can occur
 * Supports wrapping/unwrapping logic for BoostedTokens (ERC4626)
 */
export class BoostedRoute<TInput extends Currency, TOutput extends Currency> {
  public readonly pools: Pool[];
  public readonly tokenPath: AnyToken[];
  public readonly steps: BoostedRouteStep[];
  public readonly input: TInput;
  public readonly output: TOutput;
  public readonly isBoosted: true = true;

  public constructor(pools: Pool[], input: TInput, output: TOutput) {
    const wrappedInput = input.wrapped;
    const wrappedOutput = output.wrapped;

    // ═══════════════════════════════════════════════════════════
    // CASE 1: DIRECT WRAP (pools.length === 0)
    // Underlying → BoostedToken (e.g., WETH → mwETH)
    // ═══════════════════════════════════════════════════════════
    if (
      pools.length === 0 &&
      wrappedOutput.isBoosted &&
      !wrappedInput.isBoosted
    ) {
      invariant(
        wrappedOutput.underlying.equals(wrappedInput),
        'DIRECT_WRAP: output must wrap input'
      );

      this.pools = pools;
      this.tokenPath = [wrappedInput, wrappedOutput];
      this.steps = [
        {
          type: BoostedRouteStepType.WRAP,
          tokenIn: wrappedInput,
          tokenOut: wrappedOutput,
        },
      ];
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
      wrappedInput.isBoosted &&
      !wrappedOutput.isBoosted
    ) {
      invariant(
        wrappedInput.underlying.equals(wrappedOutput),
        'DIRECT_UNWRAP: input must unwrap to output'
      );

      this.pools = pools;
      this.tokenPath = [wrappedInput, wrappedOutput];
      this.steps = [
        {
          type: BoostedRouteStepType.UNWRAP,
          tokenIn: wrappedInput,
          tokenOut: wrappedOutput,
        },
      ];
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

    const tokenPath: AnyToken[] = [];
    const steps: BoostedRouteStep[] = [];
    let currentToken: AnyToken = wrappedInput;

    // Start with input token
    tokenPath.push(currentToken);

    // Build path through pools with wrap/unwrap between them
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i];

      // Check if current token exists in pool
      const isToken0 = currentToken.equals(pool.token0);
      const isToken1 = currentToken.equals(pool.token1);

      if (isToken0 || isToken1) {
        // Direct match - swap through pool
        const nextPoolToken = isToken0 ? pool.token1 : pool.token0;
        tokenPath.push(nextPoolToken);
        steps.push({
          type: BoostedRouteStepType.SWAP,
          tokenIn: currentToken,
          tokenOut: nextPoolToken,
          pool: pool,
        });
        currentToken = nextPoolToken;
      } else {
        // No direct match - need wrap/unwrap step before using pool
        let tokenForPool: AnyToken | null = null;

        if (!currentToken.isBoosted) {
          // Current is underlying, check if pool has boosted version
          const boostedInPool = [pool.token0, pool.token1].find(
            t =>
              t.isBoosted &&
              'underlying' in t &&
              t.underlying.equals(currentToken)
          );

          if (boostedInPool) {
            // Wrap: underlying → boosted
            tokenPath.push(boostedInPool);
            steps.push({
              type: BoostedRouteStepType.WRAP,
              tokenIn: currentToken,
              tokenOut: boostedInPool,
            });
            tokenForPool = boostedInPool;
          }
        } else if ('underlying' in currentToken && currentToken.underlying) {
          // Current is boosted, check if pool has underlying version
          const underlying = (currentToken as BoostedToken).underlying;
          const underlyingInPool = [pool.token0, pool.token1].find(t =>
            t.equals(underlying)
          );

          if (underlyingInPool) {
            // Unwrap: boosted → underlying
            tokenPath.push(underlyingInPool);
            steps.push({
              type: BoostedRouteStepType.UNWRAP,
              tokenIn: currentToken,
              tokenOut: underlyingInPool,
            });
            tokenForPool = underlyingInPool;
          }
        }

        if (!tokenForPool) {
          throw new Error(`Cannot connect ${currentToken.symbol} to pool ${i}`);
        }

        // Now swap through pool using the wrapped/unwrapped token
        const nextPoolToken = tokenForPool.equals(pool.token0)
          ? pool.token1
          : pool.token0;
        tokenPath.push(nextPoolToken);
        steps.push({
          type: BoostedRouteStepType.SWAP,
          tokenIn: tokenForPool,
          tokenOut: nextPoolToken,
          pool: pool,
        });
        currentToken = nextPoolToken;
      }
    }

    // Check if we need to unwrap final output
    const lastToken = tokenPath[tokenPath.length - 1];
    if (
      lastToken.isBoosted &&
      'underlying' in lastToken &&
      lastToken.underlying &&
      !wrappedOutput.isBoosted &&
      lastToken.underlying.equals(wrappedOutput)
    ) {
      tokenPath.push(lastToken.underlying);
      steps.push({
        type: BoostedRouteStepType.UNWRAP,
        tokenIn: lastToken,
        tokenOut: lastToken.underlying,
      });
    } else if (
      !lastToken.isBoosted &&
      wrappedOutput.isBoosted &&
      'underlying' in wrappedOutput &&
      wrappedOutput.underlying &&
      wrappedOutput.underlying.equals(lastToken)
    ) {
      // Need to wrap final token to match output
      tokenPath.push(wrappedOutput);
      steps.push({
        type: BoostedRouteStepType.WRAP,
        tokenIn: lastToken,
        tokenOut: wrappedOutput,
      });
    }

    this.pools = pools;
    this.tokenPath = tokenPath;
    this.steps = steps;
    this.input = input;
    this.output = output;
  }

  private _midPrice: Price<TInput, TOutput> | null = null;

  /**
   * Returns the mid price of the route
   *
   * NOTE: For BoostedRoute this returns a 1:1 stub price.
   * The real midPrice calculation requires async exchange rate fetching
   *
   */
  public get midPrice(): Price<TInput, TOutput> {
    if (this._midPrice !== null) return this._midPrice;

    return (this._midPrice = new Price(this.input, this.output, 1, 1));
  }

  public get chainId(): number {
    if (this.pools.length === 0) {
      // For direct wrap/unwrap, get chainId from input or output
      return this.input.chainId;
    }
    return this.pools[0].chainId;
  }
}
