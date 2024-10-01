import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.Rootstock]: new Token(
    ChainId.Rootstock,
    '0x542fda317318ebf1d3deaf76e0b632741a7e677d',
    18,
    'WRBTC',
    'Wrapped BTC'
  ),
};
