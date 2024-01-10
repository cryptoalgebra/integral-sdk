import { Currency, Native } from "../entities";
import { WNATIVE } from "../entities/wnative";

export function unwrappedToken(currency: Currency): Currency {
    if (currency.isNative) return currency;

    if (currency.equals(WNATIVE[currency.chainId])) return Native.onChain(currency.chainId, currency.symbol ?? '', currency.name ?? '');

    return currency;
}
