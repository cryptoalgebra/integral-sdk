import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.MegaethTestnet]: new Token(
    ChainId.MegaethTestnet,
    '0x4eB2Bd7beE16F38B1F4a0A5796Fffd028b6040e9',
    18,
    'WETH',
    'Wrapped ETH'
  )
};
