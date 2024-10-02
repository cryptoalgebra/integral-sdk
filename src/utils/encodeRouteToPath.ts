import { pack } from '@ethersproject/solidity';
import { Pool } from '../entities/pool';
import { Route } from '../entities/route';
import { Currency, Token } from "../entities";
import { ADDRESS_ZERO } from "../constants";

/**
 * Converts a route to a hex encoded path
 * @param route the v3 path to convert to an encoded path
 * @param exactOutput whether the route should be encoded in reverse, for making exact output swaps
 */
export function encodeRouteToPath(
  route: Route<Currency, Currency>,
  exactOutput: boolean,
): string {
  const firstInputToken: Token = route.input.wrapped;

  const { path, types } = route.pools.reduce(
    (
      {
        inputToken,
        path,
        types,
      }: { inputToken: Token; path: (string | number)[]; types: string[] },
      pool: Pool,
      index,
    ): { inputToken: Token; path: (string | number)[]; types: string[] } => {
      const outputToken: Token = pool.token0.equals(inputToken)
        ? pool.token1
        : pool.token0;
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ['address', 'address', 'address'],
          path: [inputToken.address.toLowerCase(), ADDRESS_ZERO.toLowerCase(), outputToken.address.toLowerCase()],
        };
      } else {
        return {
          inputToken: outputToken,
          types: [...types, 'address', 'address'],
          path: [...path, ADDRESS_ZERO.toLowerCase() , outputToken.address.toLowerCase()],
        };
      }
    },
    { inputToken: firstInputToken, path: [], types: [] },
  );

  return exactOutput
    ? pack(types.reverse(), path.reverse())
    : pack(types, path);
}
