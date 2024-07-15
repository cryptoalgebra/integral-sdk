import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Zircuit]: new Token(
    ChainId.Zircuit,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped ETH',
  ),
};
