import { ChainId } from './chainIds';

export const POOL_DEPLOYER_ADDRESSES = {
  [ChainId.TACMainnet]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
  [ChainId.PlasmaMainnet]: '0xC35ED25523dE104716D66171a792B09943f6FB21'
};

export const POOL_INIT_CODE_HASH = {
  [ChainId.TACMainnet]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
  [ChainId.PlasmaMainnet]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c'
};
