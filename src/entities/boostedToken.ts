import { readContract } from 'viem/actions';
import { Address, Client, erc4626Abi } from 'viem';
import { validateAndParseAddress } from '../utils/validateAndParseAddress';
import { Currency } from './Currency';
import { Token } from './Token';

/**
 * Represents an ERC4626-wrapped token ("boosted token") that corresponds
 * to an underlying ERC20 token and adds vault-like behavior.
 *
 */
export class BoostedToken extends Token {
  /** The underlying ERC20 token (the "asset" in ERC4626 terms) */
  public readonly underlying: Token;

  /** Flag to identify boosted tokens in runtime type checks */
  public readonly isBoosted = true as const;

  public constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol: string,
    name: string,
    underlying: Token
  ) {
    super(chainId, validateAndParseAddress(address), decimals, symbol, name);
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
    if (other instanceof BoostedToken) {
      return (
        this.chainId === other.chainId &&
        this.address === other.address &&
        this.underlying.equals(other.underlying)
      );
    }
    return false;
  }

  /**
   * Helper
   * Used to calculate how many vault shares would be received for given assets.
   */
  public async previewDeposit(client: Client, assets: bigint): Promise<bigint> {
    try {
      // @ts-ignore
      const result = await readContract(client, {
        address: this.address as Address,
        functionName: 'previewDeposit',
        args: [assets],
        abi: erc4626Abi,
      });
      return result;
    } catch (e) {
      throw new Error('previewDeposit not implemented');
    }
  }

  /**
   * Helper
   * Used to calculate how many underlying assets would be received for given shares.
   */
  public async previewRedeem(client: Client, shares: bigint): Promise<bigint> {
    try {
      // @ts-ignore
      const result = await readContract(client, {
        address: this.address as Address,
        functionName: 'previewRedeem',
        args: [shares],
        abi: erc4626Abi,
      });
      return result;
    } catch (e) {
      throw new Error('previewRedeem not implemented');
    }
  }
}
