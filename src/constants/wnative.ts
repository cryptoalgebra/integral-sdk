import { ChainId } from './chainIds';
import { Token } from '../entities/Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.ADI]: new Token(
    ChainId.ADI,
    '0x000000000000000000000000000000000000800A',
    18,
    'ADI',
    'ADI'
  ),
};
