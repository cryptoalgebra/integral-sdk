import { ChainId } from './chainIds';
import { Token } from '../entities/Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.ZenithTestnet]: new Token(
    ChainId.ZenithTestnet,
    '0x0162c4eb1539e0123da26d8a6747f3deb2e01fe2',
    18,
    'WZTH',
    'Wrapped ZTH'
  ),
};
