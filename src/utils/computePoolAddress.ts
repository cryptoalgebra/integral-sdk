import { defaultAbiCoder } from '@ethersproject/abi';
import { getAddress, getCreate2Address } from '@ethersproject/address';
import { keccak256 } from '@ethersproject/solidity';
import { keccak256 as keccak256BytesOnly } from '@ethersproject/keccak256';
import { BytesLike, zeroPad, concat } from "@ethersproject/bytes";
import { toUtf8Bytes } from "@ethersproject/strings"
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

export function computePoolAddressZkSync({
  poolDeployer,
  tokenA,
  tokenB,
  initCodeHashManualOverride,
}: {
  tokenA: Token
  tokenB: Token
  initCodeHashManualOverride?: string
  poolDeployer?: string
}): string {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  return getCreate2AddressZk(
    poolDeployer ?? POOL_DEPLOYER_ADDRESSES[tokenA.chainId],
    keccak256(['bytes'], [defaultAbiCoder.encode(['address', 'address'], [token0.address, token1.address])]),
    initCodeHashManualOverride ?? POOL_INIT_CODE_HASH[tokenA.chainId]
  )
}

function getCreate2AddressZk(from: string, salt: BytesLike, initCodeHash: BytesLike): string {

  const prefix = keccak256BytesOnly(toUtf8Bytes('zksyncCreate2'))

  const addressBytes = keccak256BytesOnly(concat([prefix, zeroPad(from, 32), salt, initCodeHash, '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'])).slice(26)

  return getAddress(addressBytes)

}