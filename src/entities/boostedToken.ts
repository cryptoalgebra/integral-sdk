import { validateAndParseAddress } from '../utils/validateAndParseAddress';
import { Currency } from './Currency';
import { AbstractCurrency } from './AbstractCurrency';
import { Token } from './Token';
import invariant from 'tiny-invariant';
import { AnyToken } from '../types';

/**
 * Represents an ERC4626-wrapped token ("boosted token") that corresponds
 * to an underlying ERC20 token and adds vault-like behavior.
 */
export class BoostedToken extends AbstractCurrency {
  public readonly chainId: number;
  public readonly address: string;

  /** The underlying ERC20 token (the "asset" in ERC4626 terms) */
  public readonly underlying: Token;

  /** Flag to identify boosted tokens in runtime type checks */
  public readonly isBoosted: true = true;
  public readonly isToken: true = true;
  public readonly isNative: false = false;

  public constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol: string,
    name: string,
    underlying: Token
  ) {
    super(chainId, decimals, symbol, name);

    this.chainId = chainId;
    this.address = validateAndParseAddress(address);
    this.underlying = underlying;
  }

  /**
   * Returns the underlying (unwrapped) ERC20 token.
   */
  public get unwrapped(): Token {
    return this.underlying;
  }

  /**
   * For BoostedToken, wrapped should return itself (not the underlying).
   * This allows proper routing through boosted pools.
   */
  public get wrapped(): BoostedToken {
    return this;
  }

  /**
   * Boosted tokens are not considered equal to their underlying asset,
   * but may share metadata (symbol/name) for UI display purposes.
   */
  public equals(other: Currency): boolean {
    if (other.isBoosted) {
      return (
        this.chainId === other.chainId &&
        this.address === other.address &&
        this.underlying.equals(other.underlying)
      );
    }
    return false;
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: AnyToken): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS');
    invariant(this.address !== other.address, 'ADDRESSES');
    return this.address.toLowerCase() < other.address.toLowerCase();
  }
}
