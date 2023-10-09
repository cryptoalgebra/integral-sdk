import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.MantleTestnet]: new Token(
    ChainId.MantleTestnet,
    '0x6e2542afc68a1697feb2810437df9409d3b93493',
    18,
    'WMNT',
    'Wrapped MNT',
  ),
  [ChainId.Goerli]: new Token(
    ChainId.Goerli,
    '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    18,
    'WETH',
    'WRAPPED ETH'
  )
};
