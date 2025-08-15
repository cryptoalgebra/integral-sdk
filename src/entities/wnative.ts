import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.TACMainnet]: new Token(
    ChainId.TACMainnet,
    '0xB63B9f0eb4A6E6f191529D71d4D88cc8900Df2C9',
    18,
    'WTAC',
    'Wrapped TAC'
  ),
};
