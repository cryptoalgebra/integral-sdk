import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.SuperseedSepolia]: new Token(
    ChainId.SuperseedSepolia,
    '0xcC255E6C96a41152b2E7FB50a7511FBE333c44e9',
    18,
    'WETH',
    'Wrapped ETH'
  )
};
