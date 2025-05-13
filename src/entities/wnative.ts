import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.PromMainnet]: new Token(
    ChainId.PromMainnet,
    '0x04A21a38D5E275d6023B27504beB3095dC43B0C0',
    18,
    'WPROM',
    'Wrapped PROM'
  ),
};
