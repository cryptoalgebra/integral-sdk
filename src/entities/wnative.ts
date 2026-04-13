import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.BSC]: new Token(
    ChainId.BSC,
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
};
