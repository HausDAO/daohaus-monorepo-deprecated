import { sky, skyDark } from '@radix-ui/colors';

export const defaultDarkTheme = {
  themeName: 'dark',
  BgColor: skyDark.sky1,
  FontColor: skyDark.sky12,
};
export type Theme = typeof defaultDarkTheme;

export const defaultLightTheme: Theme = {
  themeName: 'light',
  BgColor: sky.sky1,
  FontColor: sky.sky12,
};
