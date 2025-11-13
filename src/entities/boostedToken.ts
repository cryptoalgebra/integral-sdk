import { readContract } from 'viem/actions';
import { Address, Client, createPublicClient, erc4626Abi, http } from 'viem';
import { validateAndParseAddress } from '../utils/validateAndParseAddress';
import { Currency } from './Currency';
import { AbstractCurrency } from './AbstractCurrency';
import { Token } from './Token';
import invariant from 'tiny-invariant';
import { AnyToken } from '../types';
import { CHAINS } from '../constants/viemChains';

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

  public readonly client: Client;

  public constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol: string,
    name: string,
    underlying: Token,
    client?: Client
  ) {
    super(chainId, decimals, symbol, name);

    this.chainId = chainId;
    this.address = validateAndParseAddress(address);
    this.underlying = underlying;

    const chain = CHAINS[chainId];

    invariant(chain, 'CHAIN_UNSUPPORTED');

    this.client =
      client ??
      createPublicClient({
        chain,
        transport: http(chain.rpcUrls.default.http[0]) as any,
      });
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

  /**
   * Helper
   * Used to calculate how many vault shares would be received for given assets.
   */
  public async previewDeposit(assets: bigint): Promise<bigint> {
    try {
      // @ts-ignore
      const result = await readContract(this.client, {
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
  public async previewRedeem(shares: bigint): Promise<bigint> {
    try {
      // @ts-ignore
      const result = await readContract(this.client, {
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
