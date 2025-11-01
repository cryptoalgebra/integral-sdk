import { BoostedRoute, Currency, Route } from '../entities';

/**
 * Helper: Check if route is a BoostedRoute (ERC4626)
 */
export function isBoostedRoute(
  route: Route<Currency, Currency> | BoostedRoute<Currency, Currency>
): route is BoostedRoute<Currency, Currency> {
  return 'isBoosted' in route;
}
