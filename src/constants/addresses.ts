import { ChainId } from "./chainIds"

export const POOL_DEPLOYER_ADDRESSES = {
    [ChainId.Mode]: '0x6414A461B19726410E52488d9D5ff33682701635',
    [ChainId.ModeTestnet]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
    [ChainId.Base]: '0x872f5746B3D8CC46A876cBa2269813733A56eB1D',
    [ChainId.BaseSepolia]: '0x872f5746B3D8CC46A876cBa2269813733A56eB1D'
}

export const POOL_INIT_CODE_HASH = {
    [ChainId.Mode]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.ModeTestnet]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.Base]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.BaseSepolia]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
}