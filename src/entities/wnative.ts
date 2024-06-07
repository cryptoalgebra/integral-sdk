import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Mode]: new Token(
    ChainId.Mode,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.ModeTestnet]: new Token(
    ChainId.Mode,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.Base]: new Token(
    ChainId.Mode,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.BaseSepolia]: new Token(
    ChainId.Mode,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped ETH'
  ),
};
