import { pack } from '@ethersproject/solidity';
import { Pool } from '../entities/pool';
import { Currency, Token } from '../entities';
import { BoostedRoute } from '../entities/boostedRoute';
import { BoostedToken } from '../entities/boostedToken';
import { isBoostedToken } from './isBoostedToken';

/**
 * Converts a route to a hex encoded path
 * @param route the v3 path to convert to an encoded path
 * @param exactOutput whether the route should be encoded in reverse, for making exact output swaps
 */
export function encodeBoostedRouteToPath(
  route: BoostedRoute<Currency, Currency>,
  exactOutput: boolean
): string {
  const firstInputToken: Token = route.input.wrapped; // underlying

  const { path, types } = route.pools.reduce(
    (
      {
        inputToken,
        path,
        types,
      }: { inputToken: Token; path: (string | number)[]; types: string[] },
      pool: Pool,
      index
    ): { inputToken: Token; path: (string | number)[]; types: string[] } => {
      const isToken0Boosted = isBoostedToken(pool.token0);

      const inputTokenFromPool: Token | BoostedToken =
        pool.token0.equals(inputToken) ||
        (isToken0Boosted &&
          (pool.token0 as BoostedToken).underlying.equals(inputToken))
          ? pool.token0
          : pool.token1;

      const outputTokenFromPool: Token | BoostedToken =
        pool.token0.equals(inputToken) ||
        (isToken0Boosted &&
          (pool.token0 as BoostedToken).underlying.equals(inputToken))
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
