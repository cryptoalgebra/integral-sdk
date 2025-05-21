import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.NeuraTestnet]: new Token(
    ChainId.NeuraTestnet,
    '0xBd833b6eCC30CAEaBf81dB18BB0f1e00C6997E7a',
    18,
    'WANKR',
    'Wrapped ANKR'
  ),
};
