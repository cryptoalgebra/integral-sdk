import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Zircuit]: new Token(
    ChainId.Zircuit,
    '0xC5f59163918EA373C987bd51Fe3aBF312c3e21fF',
    18,
    'WETH',
    'Wrapped ETH'
  ),
};
