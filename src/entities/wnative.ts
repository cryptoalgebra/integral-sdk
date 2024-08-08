import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.BaseSepolia]: new Token(
    ChainId.BaseSepolia,
    '0x10253594A832f967994b44f33411940533302ACb',
    18,
    'WETH',
    'WRAPPED ETH'
  ),
  [ChainId.BaseMainnet]: new Token(
    ChainId.BaseMainnet,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'WRAPPED ETH'
  )
};
