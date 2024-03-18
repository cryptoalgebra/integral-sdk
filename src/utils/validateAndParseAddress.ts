import { getAddress } from '@ethersproject/address';

export function validateAndParseAddress(address: string): string {
  try {
    return getAddress(address);
  } catch (error) {
    throw new Error(`${address} is not a valid address.`)
  }
}
