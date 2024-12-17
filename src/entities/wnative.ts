import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.FChain]: new Token(
    ChainId.FChain,
    '0x91077c999344a0d5b2A745fA75403489EB374987',
    18,
    'WF',
    'Wrapped F'
  )
};
