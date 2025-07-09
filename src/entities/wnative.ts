import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Ronin]: new Token(
    ChainId.Ronin,
    '0xe514d9deb7966c8be0ca922de8a064264ea6bcd4',
    18,
    'WRON',
    'Wrapped RON'
  ),
  [ChainId.SaigonTestnet]: new Token(
    ChainId.SaigonTestnet,
    '0xa959726154953bae111746e265e6d754f48570e6',
    18,
    'WRON',
    'Wrapped RON'
  ),
};
