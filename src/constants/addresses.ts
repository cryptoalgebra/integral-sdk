import { ChainId } from './chainIds';

export const POOL_DEPLOYER_ADDRESSES = {
  [ChainId.MegaethMainnet]: '0x28DeD2af752655Df5Ee92450DC259F92a5ABe449',
  [ChainId.MegaethTestnet]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
};

export const POOL_INIT_CODE_HASH = {
  [ChainId.MegaethMainnet]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
  [ChainId.MegaethTestnet]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c'
};
