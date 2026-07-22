import { ChainId } from './chainIds';
import { Token } from '../entities/Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.ADI]: new Token(
    ChainId.ADI,
    '0x0f460A2b3E8ba1Cc4D33E47f207EA03B37A286a7',
    18,
    'WADI',
    'Wrapped ADI'
  ),
};
