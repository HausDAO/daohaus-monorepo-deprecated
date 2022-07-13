import { utils } from 'ethers';

import numeral from 'numeral';
import { isNumberish } from './typeguards';

export const toBaseUnits = (amount: string, decimals = 18) =>
  utils.parseUnits(amount, decimals).toString();
export const toWholeUnits = (amount: string, decimals = 18) =>
  utils.formatUnits(amount, decimals).toString();

export const readableNumber = ({
  amount,
  unit,
  decimals,
  separator = ' ',
  maxDecimals,
}: {
  amount: number | string;
  unit?: string;
  decimals?: number;
  separator?: string;
  maxDecimals?: number;
}) => {
  if (typeof amount === 'string' && isNumberish(amount)) {
    amount = Number(amount);
  }
  if (typeof amount === 'string' && !isNumberish(amount)) {
    throw new Error(`${amount} is not a number`);
  }

  if (amount > 0 && amount < 1) {
    const fixedDefault = maxDecimals || decimals || 4;

    return unit
      ? `${Number(amount).toFixed(fixedDefault)}${separator}${unit}`
      : Number(amount).toFixed(fixedDefault);
  }
  if (unit) {
    return `${humanFormat(amount, {
      decimals,
      maxDecimals,
    })}${separator}${unit}`;
  }
  return `${humanFormat(amount, {
    decimals,
    maxDecimals,
  })}${separator}`;
};

export const toDollars = (amount: string | number, separator = ' ') => {
  return `$${separator}${readableNumber({ amount: amount, decimals: 2 })}`;
};
