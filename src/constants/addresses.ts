import { ChainId } from "./chainIds"

export const POOL_DEPLOYER_ADDRESSES = {
    [ChainId.SeiTestnet]: '0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C',
    [ChainId.SeiMainnet]: '0xf21D3f7e7A7e1E339228aFcAD143acC252aD05c4'
}

export const POOL_INIT_CODE_HASH = {
    [ChainId.SeiTestnet]: '0xb3fc09be5eb433d99b1ec89fd8435aaf5ffea75c1879e19028aa2414a14b3c85',
    [ChainId.SeiMainnet]: '0xa18736c3ee97fe3c96c9428c0cc2a9116facec18e84f95f9da30543f8238a782'
}