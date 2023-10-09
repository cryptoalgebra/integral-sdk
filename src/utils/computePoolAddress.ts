import { defaultAbiCoder } from '@ethersproject/abi';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256 } from '@ethersproject/solidity';
import { Token } from '../entities';
import { POOL_DEPLOYER_ADDRESSES, POOL_INIT_CODE_HASH } from "../constants";

/**
 * Computes a pool address
 * @param poolDeployer The Algebra Pool Deployer address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param initCodeHashManualOverride The initial code hash override
 * @returns The pool address
 */
export function computePoolAddress({
  tokenA,
  tokenB,
  initCodeHashManualOverride,
  poolDeployer
}: {
  tokenA: Token;
  tokenB: Token;
  initCodeHashManualOverride?: string;
  poolDeployer?: string;
}): string {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA];
  return getCreate2Address(
    poolDeployer ?? POOL_DEPLOYER_ADDRESSES[tokenA.chainId],
    keccak256(
      ['bytes'],
      [
        defaultAbiCoder.encode(
          ['address', 'address'],
          [token0.address, token1.address],
        ),
      ],
    ),
    initCodeHashManualOverride ?? POOL_INIT_CODE_HASH[tokenA.chainId],
  );
}
