import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Katla]: new Token(
    ChainId.Katla,
    '0x003eaAf23aa5fe907F32F7c415a2075b5f1629a2',
    18,
    'WETH',
    'WRAPPED ETH'
  )
};
