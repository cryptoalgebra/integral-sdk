import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Bitfinity]: new Token(
    ChainId.Bitfinity,
    '0x10253594A832f967994b44f33411940533302ACb',
    18,
    'WBTF',
    'Wrapped BTF'
  )
};
