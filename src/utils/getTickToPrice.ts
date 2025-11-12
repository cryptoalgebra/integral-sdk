import { Price } from '../entities';
import { AnyToken } from '../types';
import { tickToPrice } from './priceTickConversions';

export function getTickToPrice(
  baseToken?: AnyToken,
  quoteToken?: AnyToken,
  tick?: number
): Price<AnyToken, AnyToken> | undefined {
  if (!baseToken || !quoteToken || typeof tick !== 'number') {
    return undefined;
  }
  return tickToPrice(baseToken, quoteToken, tick);
}
