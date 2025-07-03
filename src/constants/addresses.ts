import { ChainId } from "./chainIds"

export const POOL_DEPLOYER_ADDRESSES = {
    [ChainId.SuperseedSepolia]: '0xb68b27a1c93A52d698EecA5a759E2E4469432C09',
    [ChainId.BotanixTestnet]: '0xab49321DF952315E208a2B7046A00d2015E39cba',
    [ChainId.BotanixMainnet]: '0x14618ebeb0A01aD136a95f3e3753744770D639d9'
}

export const POOL_INIT_CODE_HASH = {
    [ChainId.SuperseedSepolia]: '0x53a254b73c7f4f4a23175de0908ad4b30f3bc60806bd69bba905db6f24b991a5',
    [ChainId.BotanixTestnet]: '0xb3fc09be5eb433d99b1ec89fd8435aaf5ffea75c1879e19028aa2414a14b3c85',
    [ChainId.BotanixMainnet]: '0x62441ebe4e4315cf3d49d5957f94d66b253dbabe7006f34ad7f70947e60bf15c'
}
