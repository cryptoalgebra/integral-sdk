import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.BitlayerTestnet]: new Token(
    ChainId.BitlayerTestnet,
    '0x83f62399f2a417db8ad34a4fc54d58240fc898e9',
    18,
    'WBTC',
    'Wrapped BTC'
  ),
  [ChainId.BitlayerMainnet]: new Token(
    ChainId.BitlayerMainnet,
    '0xff204e2681a6fa0e2c3fade68a1b28fb90e4fc5f',
    18,
    'WBTC',
    'Wrapped BTC'
  ),
};
