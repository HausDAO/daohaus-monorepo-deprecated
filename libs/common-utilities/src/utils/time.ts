import { hoursToSeconds, minutesToSeconds } from 'date-fns';

export const conversionFns = {
  days: (amt: number) => hoursToSeconds(amt * 24),
  hours: (amt: number) => hoursToSeconds(amt),
  minutes: (amt: number) => minutesToSeconds(amt),
  seconds: (amt: number) => amt,
};

export const toSeconds = (amt: number, unit: keyof typeof conversionFns) =>
  conversionFns[unit]?.(amt);

export const unixTimeInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

export const calcExpiry = (duration: number) => {
  return unixTimeInSeconds() + duration;
};
