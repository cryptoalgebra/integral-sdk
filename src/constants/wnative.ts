import { ChainId } from './chainIds';
import { Token } from '../entities/Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.HyperEvm]: new Token(
    ChainId.HyperEvm,
    '0x5555555555555555555555555555555555555555',
    18,
    'WHYPE',
    'Wrapped HYPE'
  ),
  [ChainId.Robinhood]: new Token(
    ChainId.Robinhood,
    '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73',
    18,
    'WETH',
    'Wrapped ETH'
  ),
};
