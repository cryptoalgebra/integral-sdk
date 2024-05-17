import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.XLayer]: new Token(
    ChainId.XLayer,
    '0x0faC0BC0909c3b545b8A0Bc04FE4db10662CDF02',
    18,
    'WETH',
    'WRAPPED ETH'
  ),
  [ChainId.XLayerTestnet]: new Token(
    ChainId.XLayerTestnet,
    '0x0faC0BC0909c3b545b8A0Bc04FE4db10662CDF02',
    18,
    'WETH',
    'WRAPPED ETH'
  )
};
