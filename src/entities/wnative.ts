import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.MantraDukong]: new Token(
    ChainId.MantraDukong,
    '0x10d26F0491fA11c5853ED7C1f9817b098317DC46',
    18,
    'WOM',
    'Wrapped OM'
  )
};
