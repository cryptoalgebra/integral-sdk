import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.PolygonMainnet]: new Token(
    ChainId.PolygonMainnet,
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  [ChainId.PolygonAmoy]: new Token(
    ChainId.PolygonAmoy,
    '0xa5733b3a8e62a8faf43b0376d5faf46e89b3033e',
    18,
    'POL',
    'Wrapped POL'
  ),
};
