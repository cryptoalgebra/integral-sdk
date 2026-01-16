import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.CitreaMainnet]: new Token(
    ChainId.CitreaMainnet,
    '0x3100000000000000000000000000000000000006',
    18,
    'WCBTC',
    'Wrapped Citrea Bitcoin'
  )
};
