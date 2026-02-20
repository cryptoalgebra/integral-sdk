import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.PharosTestnet]: new Token(
    ChainId.PharosTestnet,
    '0x838800b758277cc111b2d48ab01e5e164f8e9471',
    18,
    'WPHRS',
    'Wrapped PHRS'
  ),
};
