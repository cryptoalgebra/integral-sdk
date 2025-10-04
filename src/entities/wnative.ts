import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.PlasmaMainnet]: new Token(
    ChainId.PlasmaMainnet,
    '0x6100E367285b01F48D07953803A2d8dCA5D19873',
    18,
    'WXPL',
    'Wrapped XPL'
  ),
};
