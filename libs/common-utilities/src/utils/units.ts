import { utils } from 'ethers';

// unstable custom typings.
import humanFormat from 'human-format';

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
  amount: number;
  unit?: string;
  decimals?: number;
  separator?: string;
}) => {
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
