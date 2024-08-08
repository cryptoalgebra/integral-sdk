import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.ZircuitTestnet]: new Token(
    ChainId.ZircuitTestnet,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.ZircuitMainnet]: new Token(
    ChainId.ZircuitMainnet,
    '0x4200000000000000000000000000000000000006',
        18,
        'WETH',
        'Wrapped ETH'
    )
};
