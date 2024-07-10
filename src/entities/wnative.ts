import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.CoreTestnet]: new Token(
    ChainId.CoreTestnet,
    '0xC5f59163918EA373C987bd51Fe3aBF312c3e21fF',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.CoreMainnet]: new Token(
    ChainId.CoreMainnet,
    '0x191E94fa59739e188dcE837F7f6978d84727AD01',
    18,
    'WCORE',
    'Wrapped CORE'
  ),
};
