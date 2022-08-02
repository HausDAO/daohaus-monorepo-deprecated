import { Noun } from '../types';

export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;
export const charLimit = (str: string, limit: number) =>
  str.length > limit ? `${str.slice(0, limit)}...` : str;

export const handlePluralNoun = (noun: Noun, count: number) =>
  count === 1 ? noun.singular : noun.plural;
