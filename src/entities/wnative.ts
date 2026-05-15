import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.RaylsMainnet]: new Token(
    ChainId.RaylsMainnet,
    '0x0000000000000000000000000000000000000400', // native is the same as wrapped
    18,
    'USDr',
    'USD Rayls'
  ),
};
