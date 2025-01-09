import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.FormMainnet]: new Token(
    ChainId.FormMainnet,
    '0xb1b812b664c28E1bA1d35De925Ae88b7Bc7cdCF5',
    18,
    'WETH',
    'Wrapped ETH'
  ),
};
