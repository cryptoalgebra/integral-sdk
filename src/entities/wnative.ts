import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.SuperseedSepolia]: new Token(
    ChainId.SuperseedSepolia,
    '0xcC255E6C96a41152b2E7FB50a7511FBE333c44e9',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.BotanixTestnet]: new Token(
    ChainId.BotanixTestnet,
    '0xcC255E6C96a41152b2E7FB50a7511FBE333c44e9',
    18,
    'WBTC',
    'Wrapped BTC'
  ),
  [ChainId.BotanixMainnet]: new Token(
    ChainId.BotanixMainnet,
    '0x0D2437F93Fed6EA64Ef01cCde385FB1263910C56',
    18,
    'WBTC',
    'Wrapped BTC'
  )
};
