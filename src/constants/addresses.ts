import { ChainId } from "./chainIds"

export const POOL_DEPLOYER_ADDRESSES = {
    [ChainId.Ronin]: '0x13bbcA722f42652227D52141cBc97924DC9d3866',
    [ChainId.SaigonTestnet]: '0x90D4c5cAd44Ab859d4F7Ba8e54fF625a16fc803D'
}

export const POOL_INIT_CODE_HASH = {
    [ChainId.Ronin]: '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
    [ChainId.SaigonTestnet]: '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c'
}