import { ChainId } from './chainIds';
import { Token } from '../entities/Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Henesys]: new Token(
    ChainId.Henesys,
    '0x150869eac5C58d3655f860C4316107fB626244d0',
    18,
    'WNXPC',
    'Wrapped NXPC'
  ),
};
