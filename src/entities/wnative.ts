import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.BscTestnet]: new Token(
    ChainId.BscTestnet,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WETH',
    'Wrapped ETH'
  ),
};
