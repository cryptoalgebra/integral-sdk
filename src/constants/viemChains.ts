import { Chain } from 'viem';

const baseChain: Chain = {
  id: 8453,
  name: 'Base',
  nativeCurrency: { name: 'Base Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://base.gateway.tenderly.co/4q52tUempJuHciTWl5m1Ef'],
    },
    public: {
      http: ['https://base.gateway.tenderly.co/4q52tUempJuHciTWl5m1Ef'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'BaseScan',
      url: 'https://basescan.org',
    },
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org',
    },
  },
  contracts: {
    multicall3: {
      address: '0xfe3becd788320465ab649015f34f7771220a88b2',
      blockCreated: 24170245,
    },
  },
};

const baseSepoliaChain: Chain = {
  id: 84532,
  name: 'Base Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://base-sepolia-rpc.publicnode.com'],
    },
    public: {
      http: ['https://base-sepolia-rpc.publicnode.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Basescan',
      url: 'https://sepolia.basescan.org',
    },
    etherscan: {
      name: 'Basescan',
      url: 'https://sepolia.basescan.org',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1059647,
    },
  },
};

export const CHAINS: { [chainId: number]: Chain } = {
  [baseChain.id]: baseChain,
  [baseSepoliaChain.id]: baseSepoliaChain,
};
