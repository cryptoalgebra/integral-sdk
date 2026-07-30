import { ChainId } from './chainIds';
import { Token } from '../entities/Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.AlpenTestnet]: new Token(
    ChainId.AlpenTestnet,
    '0x10253594A832f967994b44f33411940533302ACb',
    18,
    'WsBTC',
    'Wrapped Signet BTC'
  ),
};
