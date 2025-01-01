import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Arbitrum]: new Token(
    ChainId.Arbitrum,
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    18,
    'WETH',
    'Wrapped ETH'
  ),
};
