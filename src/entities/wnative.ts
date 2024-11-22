import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.XLayer]: new Token(
    ChainId.XLayer,
    '0x87a851c652e5d772ba61ec320753c6349bb3c1e3',
    18,
    'WOKB',
    'WRAPPED OKB'
  ),
  [ChainId.XLayerTestnet]: new Token(
    ChainId.XLayerTestnet,
    '0x87a851c652e5d772ba61ec320753c6349bb3c1e3',
    18,
    'WOKB',
    'WRAPPED OKB'
  ),
  [ChainId.SonicTestnet]: new Token(
    ChainId.SonicTestnet,
    '0xb621330F2F6Fd60503969cfd87ed33B3Ee925E36',
    18,
    'WSonic',
    'Wrapped Sonic'
  ),
};
