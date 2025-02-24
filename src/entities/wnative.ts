import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.SeiTestnet]: new Token(
    ChainId.SeiTestnet,
    '0x3921eA6Cf927BE80211Bb57f19830700285b0AdA',
    18,
    'WSEI',
    'Wrapped SEI'
  ),
};
