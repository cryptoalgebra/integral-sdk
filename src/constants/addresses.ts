import { ChainId } from "./chainIds"

export const POOL_DEPLOYER_ADDRESSES = {
    [ChainId.Arthera]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
    [ChainId.ArtheraTestnet]: '0x03f8B4b140249Dc7B2503C928E7258CCe1d91F1A',
    [ChainId.Base]: '0xC2495a2AaaA8985CAa520f040e19A1228CDdcC13'
}

export const POOL_INIT_CODE_HASH = {
    [ChainId.Arthera]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.ArtheraTestnet]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.Base]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d'
}