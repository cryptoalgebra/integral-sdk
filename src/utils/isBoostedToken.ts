import { BoostedToken, Token } from '../entities';

/**
 * Helper: Check if token is a BoostedToken (ERC4626)
 */
export function isBoostedToken(
  token: Token | BoostedToken
): token is BoostedToken {
  return 'isBoosted' in token && 'underlying' in token;
}
