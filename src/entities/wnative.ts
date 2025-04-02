import { ChainId } from "../constants/chainIds";
import { Token } from './Token';

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WNATIVE: { [chainId: number]: Token } = {
  [ChainId.MonadTestnet]: new Token(
    ChainId.MonadTestnet,
    '0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701',
    18,
    'WMON',
    'Wrapped MON'
  )
};
