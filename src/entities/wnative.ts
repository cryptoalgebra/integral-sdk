import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Citrea]: new Token(
    ChainId.Citrea,
    '0x8d0c9d1c17aE5e40ffF9bE350f57840E9E66Cd93',
    18,
    'WCBTC',
    'Wrapped CBTC'
  ),
};
