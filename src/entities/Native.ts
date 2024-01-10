import { Token } from "./Token";
import { Currency } from "./Currency";

import NativeCurrency from './NativeCurrency';

import invariant from 'tiny-invariant';
import { WNATIVE } from "./wnative";

/**
 * Native is the main usage of a 'native' currency
 */
export class Native extends NativeCurrency {
  protected constructor(chainId: number, symbol: string, name: string) {
    super(chainId, 18, symbol, name);
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId];
    invariant(!!wnative, 'WRAPPED');
    return wnative;
  }

  private static _naitveCache: { [chainId: number]: Native } = {};

  public static onChain(chainId: number, symbol: string, name: string): Native {
    return (
      this._naitveCache[chainId] ??
      (this._naitveCache[chainId] = new Native(chainId, symbol, name))
    );
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }
}
