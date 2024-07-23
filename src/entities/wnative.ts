import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.ScrollMainnet]: new Token(
    ChainId.ScrollMainnet,
    '0x5300000000000000000000000000000000000004',
    18,
    'WETH',
    'Wrapped ETH'
  ),
};
