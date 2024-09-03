import { ChainId } from '../constants/chainIds';
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Mantle]: new Token(
    ChainId.Mantle,
    '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
    18,
    'WMNT',
    'WRAPPED MNT'
  ),
  [ChainId.MantleSepolia]: new Token(
    ChainId.MantleSepolia,
    '0xb1eda18c1b730a973dac2ec37cfd5685d7de10dd',
    18,
    'WMNT',
    'WRAPPED MNT'
  ),
  [ChainId.Telos]: new Token(
    ChainId.Telos,
    '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    18,
    'WTLS',
    'WRAPPED TLS'
  ),
  [ChainId.TelosTestnet]: new Token(
    ChainId.TelosTestnet,
    '0x6E2542aFC68a1697FeB2810437DF9409D3b93493',
    18,
    'WTLS',
    'WRAPPED TLS'
  ),
  [ChainId.Taiko]: new Token(
    ChainId.Taiko,
    '0xA51894664A773981C6C112C43ce576f315d5b1B6',
    18,
    'WETH',
    'WRAPPED ETH'
  ),
  [ChainId.Hekla]: new Token(
    ChainId.Hekla,
    '0xae2C46ddb314B9Ba743C6dEE4878F151881333D9',
    18,
    'WETH',
    'WRAPPED ETH'
  ),
};
