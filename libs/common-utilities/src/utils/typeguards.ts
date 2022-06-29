import { ethers } from 'ethers';

// TS user-defined typeguards
export const isArray = (item: unknown): item is unknown[] =>
  Array.isArray(item);
export const isNumber = (item: unknown): item is number =>
  typeof item === 'number';
export const isString = (item: unknown): item is string =>
  typeof item === 'string';
export const isBoolean = (item: unknown): item is boolean =>
  typeof item === 'boolean';
export const isNumberish = (item: unknown): item is string | number =>
  isNumber(item) || isNumberString(item);
// general 'is' guards that help us verify shapes of data

export const isNumberString = (item: unknown) =>
  isString(item) && !isNaN(parseFloat(item)) && isFinite(Number(item));
export const isLengthOf = (item: unknown, length: number) =>
  isArray(item) && item.length === length;
export const isEthAddress = (item: unknown) =>
  isString(item) && ethers.utils.isAddress(item);
