import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.TaraxaMainnet]: new Token(
    ChainId.TaraxaMainnet,
    '0x9f3f1fa0822463f592c1725ED08a9cF261958627',
    18,
    'WTARA',
    'Wrapped TARA'
  )
};
