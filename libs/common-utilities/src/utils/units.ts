import { utils } from 'ethers';

import * as numeral from 'numeral';
import { isNumberish } from './typeguards';

export const toBaseUnits = (amount: string, decimals = 18) =>
  utils.parseUnits(amount, decimals).toString();
export const toWholeUnits = (amount: string, decimals = 18) =>
  utils.formatUnits(amount, decimals).toString();

/*
  http://numeraljs.com/
  const string = numeral(1000.23).format('$ 0,0[.]0000 %'); => $ 1000.2300 %

  type         number       format        result
  ------------------------  --------------------------
  number       10000	      '0,0.0000'	   10,000.0000
  number       -10000       '0,0.0'       -10,000.0
  number       -10000       '0,0[.]0'     -10,000
  number       -10000.23    '0,0[.]0'     -10,000.2
  currency     1230974	    '0.0a'	       1.2m
  currency     1001         '$ 0,0[.]00'	 $ 1,001
  currency     1230974	    '($ 0.00 a)'	 $ 1.23 m
  currency     1000.2       '0,0[.]00 $'   1,000.20 $
  currency     1001         '$ 0,0[.]00'   $ 1,001
  pecentage    1	          '0%'           100%
  percentage   0.974878234  '0.000%'       97.488%
  percentage   -0.43        '0 %'          -43 %
  exponential  1123456789	  '0,0e+0'       1e+9
  exponential  12398734.202	'0.00e+0'      1.24e+7
*/

const formats = ['currency', 'currency', 'percent', 'exponent'];

type NumericalFormat =
  | 'currency'
  | 'currencyShort'
  | 'number'
  | 'numberShort'
  | 'percent'
  | 'percentShort'
  | 'exponential';

const formatGenerator = (
  separator = ' ',
  type: NumericalFormat,
  decimals: number
) => {
  const short = type.match(/(short)/i) ? 'a' : null;
  const symbol = type.match(/(currency)/i)
    ? '$'
    : type.match(/(percent)/i)
    ? '%'
    : type.match(/(exponent)/i)
    ? 'e'
    : null;

  if (type.match(/(percent|exponent)/i)) {
    return `0[.]${'0'.repeat(decimals)}${symbol}${separator}`;
  } else if (type.match(/(currency|number)/i)) {
    return `${symbol}0[.]${'0'.repeat(decimals)}${short}${separator}`;
  }
};

const getNumericalValue = ({
  value,
  format,
}: {
  value: number;
  format: defaultKeys | string;
}) => {
  if (!format) {
    throw new Error(`must define either format`);
  }

  let n;

  if (format && numericalDefaults.base[format as defaultKeys]) {
    n = numeral(value);
    return n.format(numericalDefaults.base?.[format as defaultKeys]);
  }

  n = numeral(value);
  return n.format(format);
};

export const readableNumber = ({
  amount,
  unit,
  decimals,
  separator = ' ',
  maxDecimals,
  format,
}: {
  amount: number | string;
  unit?: string;
  decimals?: number;
  separator?: string;
  maxDecimals?: number;
  format?: defaultKeys | string;
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
    return `${getNumericalValue({
      value: amount,
      format: format || 'currency',
    })}${separator}${unit}`;
  }
  return `${getNumericalValue({
    value: amount,
    format: format || 'currency',
  })}${separator}`;
};

export const toDollars = (amount: string | number, separator = ' ') => {
  return `$${separator}${readableNumber({ amount: amount, decimals: 2 })}`;
};
