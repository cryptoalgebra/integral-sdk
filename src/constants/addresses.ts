import { ChainId } from './chainIds';

export const POOL_DEPLOYER_ADDRESSES = {
  [ChainId.HyperEvm]: '0x88813b47D2687ceA50DBfd644EeFE17294E10303',
  [ChainId.Robinhood]: '0x45362763166CfED6174d312Fa1449EA1FC37988a',
};

export const POOL_INIT_CODE_HASH = {
  [ChainId.HyperEvm]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
  [ChainId.Robinhood]:
    '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
};
