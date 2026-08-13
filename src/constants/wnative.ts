import { ChainId } from './chainIds';
import { Token } from '../entities/Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Robinhood]: new Token(
    ChainId.Robinhood,
    '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.MonadTestnet]: new Token(
    ChainId.MonadTestnet,
    '0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701',
    18,
    'WMON',
    'Wrapped MON'
  ),
};
