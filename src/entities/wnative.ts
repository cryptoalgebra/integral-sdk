import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.KiteTestnet]: new Token(
    ChainId.KiteTestnet,
    '0x3bC8f037691Ce1d28c0bB224BD33563b49F99dE8',
    18,
    'WKITE',
    'Wrapped KITE'
  )
};
