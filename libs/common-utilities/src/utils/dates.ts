import { format } from 'date-fns';

export const formatDateTimeFromSeconds = (
  seconds: string | undefined
): string | undefined => {
  if (!seconds) {
    return;
  }
  return format(new Date(Number(seconds) * 1000), 'h:m aaa MMMM do y');
};
