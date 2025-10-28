import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.SophonOSTestnet]: new Token(
    ChainId.SophonOSTestnet,
    '0x577bdFf849E65C1eFfeb8114e9cd243C1180F158',
    18,
    'WSOPH',
    'Wrapped SOPH'
  )
};
