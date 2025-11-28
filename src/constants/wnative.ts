import { ChainId } from './chainIds';
import { Token } from '../entities/Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.MonadMainnet]: new Token(
    ChainId.MonadMainnet,
    '0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A',
    18,
    'WMON',
    'Wrapped MON'
  ),
};
