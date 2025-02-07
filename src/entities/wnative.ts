import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.BerachainMainnet]: new Token(
    ChainId.BerachainMainnet,
    '0x6969696969696969696969696969696969696969',
    18,
    'WBERA',
    'Wrapped BERA'
  )
};
