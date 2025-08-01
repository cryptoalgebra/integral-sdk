import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.HyperEvmMainnet]: new Token(
    ChainId.HyperEvmMainnet,
    '0x5555555555555555555555555555555555555555',
    18,
    'WHYPE',
    'Wrapped HYPE'
  ),
  [ChainId.BaseSepolia]: new Token(
    ChainId.BaseSepolia,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped ETH'
  )
};
