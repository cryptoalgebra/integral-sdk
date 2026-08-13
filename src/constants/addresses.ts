import { ChainId } from './chainIds';

export const POOL_DEPLOYER_ADDRESSES = {
  [ChainId.Robinhood]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
  [ChainId.MonadTestnet]: '0x49af1aCbB203019f048E03c808D16F011BC1CA8F',
};

export const POOL_INIT_CODE_HASH = {
  [ChainId.Robinhood]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
  [ChainId.MonadTestnet]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
};
