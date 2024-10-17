import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.BerachainArtio]: new Token(
    ChainId.BerachainArtio,
    '0x7507c1dc16935b82698e4c63f2746a2fcf994df8',
    18,
    'WBERA',
    'WRAPPED BERA'
  ),
};
