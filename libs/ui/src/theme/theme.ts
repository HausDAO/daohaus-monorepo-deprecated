import { sky, skyDark } from '@radix-ui/colors';

export const defaultDarkTheme = {
  themeName: 'dark',
  bgColor: skyDark.sky1,
  fontColor: skyDark.sky12,
};
export type Theme = typeof defaultDarkTheme;

export const defaultLightTheme: Theme = {
  themeName: 'light',
  bgColor: sky.sky1,
  fontColor: sky.sky12,
};
