import { ChainId } from "./chainIds"

export const POOL_DEPLOYER_ADDRESSES = {
    [ChainId.Mantle]: '0x9dE2dEA5c68898eb4cb2DeaFf357DFB26255a4aa',
    [ChainId.MantleSepolia]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
    [ChainId.Telos]: '0x061e47Ab9f31D293172efb88674782f80eCa88de',
    [ChainId.TelosTestnet]: '0xE63AEf68c9C80C06d241d44B3C21Da4da2E582Bd',
    [ChainId.Taiko]: '0xb68b27a1c93A52d698EecA5a759E2E4469432C09',
    [ChainId.Hekla]: '0xf992eBeAB671AAc668Db5f8986276b55E49ec928'
}

export const POOL_INIT_CODE_HASH = {
    [ChainId.Mantle]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.MantleSepolia]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.Telos]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.TelosTestnet]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.Taiko]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.Hekla]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d'
}