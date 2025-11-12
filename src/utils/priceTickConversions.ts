import { Price } from '../entities';
import JSBI from 'jsbi';
import { Q192 } from '../constants/internalConstants';
import { encodeSqrtRatioX96 } from './encodeSqrtRatioX96';
import { TickMath } from './tickMath';
import { AnyToken } from '../types';

const ABS = (x: any) =>
  JSBI.lessThan(x, JSBI.BigInt(0)) ? JSBI.multiply(x, JSBI.BigInt(-1)) : x;

/**
 * Returns a price object corresponding to the input tick and the base/quote token
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
export function tickToPrice(
  baseToken: AnyToken,
  quoteToken: AnyToken,
  tick: number
): Price<AnyToken, AnyToken> {
  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick);

  const ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);

  return baseToken.sortsBefore(quoteToken)
    ? new Price(baseToken, quoteToken, Q192, ratioX192)
    : new Price(baseToken, quoteToken, ratioX192, Q192);
}

/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */
export function priceToClosestTick(price: Price<AnyToken, AnyToken>): number {
  const sorted = price.baseCurrency.sortsBefore(price.quoteCurrency);

  const sqrtInput = sorted
    ? encodeSqrtRatioX96(price.numerator, price.denominator)
    : encodeSqrtRatioX96(price.denominator, price.numerator);

  // initial tick
  const tick = TickMath.getTickAtSqrtRatio(sqrtInput);

  // check tick-1, tick, tick+1
  const candidates = [tick - 1, tick, tick + 1].filter(
    t => t >= TickMath.MIN_TICK && t <= TickMath.MAX_TICK
  );

  let bestTick = tick;
  let bestDiff = ABS(
    JSBI.subtract(sqrtInput, TickMath.getSqrtRatioAtTick(tick))
  );

  for (const t of candidates) {
    const diff = ABS(JSBI.subtract(sqrtInput, TickMath.getSqrtRatioAtTick(t)));
    if (JSBI.lessThan(diff, bestDiff)) {
      bestDiff = diff;
      bestTick = t;
    }
  }

  return bestTick;
}
