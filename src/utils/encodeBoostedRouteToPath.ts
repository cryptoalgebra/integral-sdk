import { pack } from '@ethersproject/solidity';
import { Pool } from '../entities/pool';
import { BoostedRoute, Currency } from '../entities';
import { AnyToken } from '../types';

/**
 * Converts a route to a hex encoded path
 * @param route the v3 path to convert to an encoded path
 * @param exactOutput whether the route should be encoded in reverse, for making exact output swaps
 */
export function encodeBoostedRouteToPath(
  route: BoostedRoute<Currency, Currency>,
  exactOutput: boolean
): string {
  const firstInputToken: AnyToken = route.input.wrapped;

  const { path, types } = route.pools.reduce(
    (
      {
        inputToken,
        path,
        types,
      }: {
        inputToken: AnyToken;
        path: (string | number)[];
        types: string[];
      },
      pool: Pool,
      index
    ): {
      inputToken: AnyToken;
      path: (string | number)[];
      types: string[];
    } => {
      const inputTokenFromPool: AnyToken =
        pool.token0.equals(inputToken) ||
        (pool.token0.isBoosted && pool.token0.underlying.equals(inputToken))
          ? pool.token0
          : pool.token1;

      const outputTokenFromPool: AnyToken =
        pool.token0.equals(inputToken) ||
        (pool.token0.isBoosted && pool.token0.underlying.equals(inputToken))
          ? pool.token1
          : pool.token0;

      if (index === 0) {
        return {
          inputToken: outputTokenFromPool,
          types: ['address', 'address', 'address'],
          path: [
            inputTokenFromPool.address,
            pool.deployer,
            outputTokenFromPool.address,
          ],
        };
      } else {
        return {
          inputToken: outputTokenFromPool,
          types: [...types, 'address', 'address'],
          path: [...path, pool.deployer, outputTokenFromPool.address],
        };
      }
    },
    { inputToken: firstInputToken, path: [], types: [] }
  );

  return exactOutput
    ? pack(types.reverse(), path.reverse())
    : pack(types, path);
}
