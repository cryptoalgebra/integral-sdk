import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.HyperEvmTestnet]: new Token(
    ChainId.HyperEvmTestnet,
    '0x5555555555555555555555555555555555555555',
    18,
    'WHYPE',
    'Wrapped HYPE'
  )
};
