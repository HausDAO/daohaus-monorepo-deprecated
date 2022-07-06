import { utils } from 'ethers';

// TS CHALLENGE

// unstable custom typings that only suits our needs
// create a .d.ts file for the human-format library
// and make a PR to merge it into their library
import humanFormat from 'human-format';
import { isNumberish } from './typeguards';

export const toBaseUnits = (amount: string, decimals = 18) =>
  utils.parseUnits(amount, decimals).toString();
export const toWholeUnits = (amount: string, decimals = 18) =>
  utils.formatUnits(amount, decimals).toString();

export const readableNumber = ({
  amount,
  unit,
  decimals = 1,
  separator = '',
}: {
  amount: number | string;
  unit?: string;
  decimals?: number;
  separator?: string;
}) => {
  if (typeof amount === 'string' && isNumberish(amount)) {
    amount = Number(amount);
  }
  if (typeof amount === 'string' && !isNumberish(amount)) {
    throw new Error(`${amount} is not a number`);
  }
  if (amount == null) return null;
  if (amount > 0 && amount < 1) {
    return `${Number(amount.toFixed(4))} ${unit}`;
  }
  if (unit) {
    return `${humanFormat(amount, {
      unit: ` ${unit}`,
      decimals,
      separator,
    })}`;
  }
  return `${humanFormat(amount, {
    decimals,
    separator,
  })}`;
};
