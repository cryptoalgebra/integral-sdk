import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Kite]: new Token(
    ChainId.Kite,
    '0xcc788DC0486CD2BaacFf287eea1902cc09FbA570',
    18,
    'WKITE',
    'Wrapped KITE'
  ),
  [ChainId.KiteTestnet]: new Token(
    ChainId.KiteTestnet,
    '0x3bC8f037691Ce1d28c0bB224BD33563b49F99dE8',
    18,
    'WKITE',
    'Wrapped KITE'
  ),
};
