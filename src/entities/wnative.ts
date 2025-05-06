import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.BaseSepolia]: new Token(
    ChainId.BaseSepolia,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.AvaxFuji]: new Token(
    ChainId.AvaxFuji,
    '0xb3B3CbEd8243682845C2ff23Ea1FD48e6144E34F',
    18,
    'WAVAX',
    'Wrapped AVAX'
  ),
};
