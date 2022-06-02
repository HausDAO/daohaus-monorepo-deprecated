import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

export const formatDateTimeFromSeconds = (
  seconds: string | undefined
): string | undefined => {
  if (!seconds) {
    return;
  }
  return dayjs(new Date(Number(seconds) * 1000), 'h:m aaa MMMM do y').format();
};

export const formatDistanceToNowFromSeconds = (
  seconds: string | undefined
): string | undefined => {
  if (!seconds) {
    return;
  }
  dayjs.extend(relativeTime);
  return dayjs(new Date(Number(seconds) * 1000)).toNow();
};
