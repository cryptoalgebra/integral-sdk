import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Arthera]: new Token(
    ChainId.Arthera,
    '0x69D349E2009Af35206EFc3937BaD6817424729F7',
    18,
    'WAA',
    'WRAPPED AA'
  ),
  [ChainId.ArtheraTestnet]: new Token(
    ChainId.ArtheraTestnet,
    '0x5A1750f9cb8A7E98e1FD618922Af276493318710',
    18,
    'WAA',
    'WRAPPED AA'
  ),
  [ChainId.Base]: new Token(
    ChainId.Base,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'WRAPPED ETH'
  ),
};
