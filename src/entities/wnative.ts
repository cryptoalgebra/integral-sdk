import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.MorphHolesky]: new Token(
    ChainId.MorphHolesky,
    '0x5300000000000000000000000000000000000011',
    18,
    'WETH',
    'Wrapped ETH'
  )
};
