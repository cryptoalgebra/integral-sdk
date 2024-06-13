import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.xLayer]: new Token(
    ChainId.xLayer,
    '0xe538905cf8410324e03a5a23c1c177a474d59b2b',
    18,
    'WOKB',
    'Wrapped OKB'
  )
};
