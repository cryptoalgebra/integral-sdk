import { ChainId } from "./chainIds"

export const POOL_DEPLOYER_ADDRESSES = {
    [ChainId.HyperEvmMainnet]: '0x0d1D2Af74a59A2A0F266fD75Fb081F637c4ec9C2',
    [ChainId.BaseSepolia]: '0x58fcDe2268c9cD0168bddC81ba4Cf9F174160258'
}

export const POOL_INIT_CODE_HASH = {
    [ChainId.HyperEvmMainnet]: '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c',
    [ChainId.BaseSepolia]: '0xa18736c3ee97fe3c96c9428c0cc2a9116facec18e84f95f9da30543f8238a782'
}