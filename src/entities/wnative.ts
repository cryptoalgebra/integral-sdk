import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Moonriver]: new Token(
    ChainId.Moonriver,
    '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
    18,
    'WMOVR',
    'Wrapped MOVR'
  ),
};
