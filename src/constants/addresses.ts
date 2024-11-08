import { ChainId } from "./chainIds"

export const POOL_DEPLOYER_ADDRESSES = {
    [ChainId.Goerli]: '0x03f8B4b140249Dc7B2503C928E7258CCe1d91F1A',
    [ChainId.ZKSyncTestnet]: '0xbf3687C4475496126640fE631c2B30CAf552dC68',
    [ChainId.ZKSync]: '0xca2626Effd772A7422D5Ba7bA995092c5EcBeE2E',
    [ChainId.BSCTestnet]: '0x66997a68146274b888b7Fa7d2301cae19158f1E0',
    [ChainId.Mantle]: '0x9dE2dEA5c68898eb4cb2DeaFf357DFB26255a4aa',
    [ChainId.Telos]: '0x061e47Ab9f31D293172efb88674782f80eCa88de',
    [ChainId.MantleTestnet]: '0x2d082cDE2894Fe900001d5cb3aBa84c95b4E9cF7',
    [ChainId.TelosTestnet]: '0xE63AEf68c9C80C06d241d44B3C21Da4da2E582Bd',
    [ChainId.MeterTestnet]: '0xEbAB31dCe66b3EEbA611ac7156f8449d356f7cF4'
    [ChainId.BerachainTestnet]: '0x54506e0a71f6c883dA3c7eaDb0aEbEDbaC0c59f5',
    [ChainId.FormTestnet]: '0xD9C1b76e7b0a1Cbcefe99744D6a98872F47917Ba',
    [ChainId.Katla]: '0xfEE449019c51242F3b4E96A0bc66B455950c2650',
    [ChainId.Holesky]: '0x23cA0Fb37cbdC80f8317972aBc8ae928866F62a8',
    [ChainId.Mode]: '0x6414A461B19726410E52488d9D5ff33682701635',
    [ChainId.ModeTestnet]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
    [ChainId.BlastTestnet]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
    [ChainId.BlastTestnetBlade]: '0xF2738e308b9BDc6475e375ad5dd50517B6Df9009',
    [ChainId.Arthera]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
    [ChainId.ArtheraTestnet]: '0x03f8B4b140249Dc7B2503C928E7258CCe1d91F1A',
    [ChainId.LineaSepolia]: '0x99E317c0099F0fB8C5913db976d00fddeDB69583',
    [ChainId.MantleSepolia]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
    [ChainId.SeiDevnet]: '0x6AD6A4f233F1E33613e996CCc17409B93fF8bf5f',
    [ChainId.NeonDevnet]: '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A',
    [ChainId.Linea]: '0xA76990a229961280200165c4e08c96Ea67304C3e',
    [ChainId.BaseSepolia]: '0x4439199c3743161ca22bB8F8B6deC5bF6fF65b04'
}

export const POOL_INIT_CODE_HASH = {
    [ChainId.Goerli]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.ZKSyncTestnet]: '0x01001625a500a20b4626b494f0d5b1b3c60127f09224390ffb85bef75dbd81f9',
    [ChainId.ZKSync]: '0x01001625a500a20b4626b494f0d5b1b3c60127f09224390ffb85bef75dbd81f9',
    [ChainId.BSCTestnet]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.Mantle]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.Telos]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.MantleTestnet]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.TelosTestnet]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.MeterTestnet]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91'
    [ChainId.BerachainTestnet]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.FormTestnet]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.Katla]: '0x177d5fbf994f4d130c008797563306f1a168dc689f81b2fa23b4396931014d91',
    [ChainId.Holesky]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.Mode]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.ModeTestnet]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.BlastTestnet]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.BlastTestnetBlade]: '0xa58656484de172ae0d4ecbb45c1b0f1eb82cfe33cf9653f79a430c2b3faa52d4',
    [ChainId.Arthera]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.ArtheraTestnet]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.LineaSepolia]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.MantleSepolia]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.SeiDevnet]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.NeonDevnet]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.Linea]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d',
    [ChainId.BaseSepolia]: '0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d'
}