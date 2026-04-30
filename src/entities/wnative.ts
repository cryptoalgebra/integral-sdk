import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.RaylsMainnet]: new Token(
    ChainId.RaylsMainnet,
    '0xDeaD1F5aF792afc125812E875A891b038f888258', // no wrapped on mainnet
    18,
    'WETH',
    'Wrapped ETH'
  ),
};
