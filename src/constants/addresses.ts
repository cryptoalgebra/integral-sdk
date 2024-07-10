import { ChainId } from './chainIds';

export const POOL_DEPLOYER_ADDRESSES = {
  [ChainId.CoreTestnet]: '0xBF8E4eee4c0584D71E43c00df345bc40B02d52D6',
  [ChainId.CoreMainnet]: '0x24196b3f35E1B8313016b9f6641D605dCf48A76a',
};

export const POOL_INIT_CODE_HASH = {
  [ChainId.CoreTestnet]:
    '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
  [ChainId.CoreMainnet]:
    '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
};
