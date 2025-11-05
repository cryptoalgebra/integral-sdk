import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Rayls]: new Token(
    ChainId.Rayls,
    '0xEfa5f6cdE87C6cAd21CD556F73165335306Ff38a',
    18,
    'WETH',
    'Wrapped ETH'
  )
};
