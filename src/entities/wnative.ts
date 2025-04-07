import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.SonicBlaze]: new Token(
    ChainId.SonicBlaze,
    '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38',
    18,
    'WS',
    'Wrapped S'
  )
};
