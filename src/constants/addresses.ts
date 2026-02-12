import { ChainId } from './chainIds';

export const POOL_DEPLOYER_ADDRESSES = {
  [ChainId.SkaleBase]: '0xab49321DF952315E208a2B7046A00d2015E39cba',
  [ChainId.SkaleSandbox]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
};

export const POOL_INIT_CODE_HASH = {
  [ChainId.SkaleBase]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
  [ChainId.SkaleSandbox]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
};
