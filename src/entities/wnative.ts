import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Goerli]: new Token(
    ChainId.Goerli,
    '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    18,
    'WETH',
    'WRAPPED ETH'
  ),
  [ChainId.ZKSyncTestnet]: new Token(
    ChainId.ZKSyncTestnet,
    '0x20b28B1e4665FFf290650586ad76E977EAb90c5D',
    18,
    'WETH',
    'WRAPPED ETH'
  ),
  [ChainId.BSCTestnet]: new Token(
    ChainId.BSCTestnet,
    '0x094616f0bdfb0b526bd735bf66eca0ad254ca81f',
    18,
    'WBNB',
    'WRAPPED BNB'
  ),
  [ChainId.Mantle]: new Token(
    ChainId.Mantle,
    '0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8',
    18,
    'WMNT',
    'WRAPPED MNT'
  ),
  [ChainId.Telos]: new Token(
    ChainId.Telos,
    '0xd102ce6a4db07d247fcc28f366a623df0938ca9e',
    18,
    'TLOS',
    'WRAPPED TLOS'
  ),
  [ChainId.MantleTestnet]: new Token(
    ChainId.MantleTestnet,
    '0x6e2542afc68a1697feb2810437df9409d3b93493',
    18,
    'WMNT',
    'WRAPPED MNT',
  ),
  [ChainId.TelosTestnet]: new Token(
    ChainId.TelosTestnet,
    '0x6e2542afc68a1697feb2810437df9409d3b93493',
    18,
    'TLOS',
    'WRAPPED TLOS'
  ),
  [ChainId.BerachainTestnet]: new Token(
    ChainId.BerachainTestnet,
    '0x5806e416da447b267cea759358cf22cc41fae80f',
    18,
    'BERA',
    'WRAPPED BERA'
  )
};
