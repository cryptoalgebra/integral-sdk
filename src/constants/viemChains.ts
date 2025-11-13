import { base, baseSepolia } from 'viem/chains';

export const CHAINS: { [chainId: number]: any } = {
  [base.id]: base,
  [baseSepolia.id]: baseSepolia,
};
