import { sky, tomato, tomatoDark, skyDark } from '@radix-ui/colors';

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
export const broodingTomatoDarkness: Theme = {
  themeName: 'brood',
  BgColor: tomatoDark.tomato2,
  FontColor: tomatoDark.tomato10,
};
export const shimmeringTomatoLuminence: Theme = {
  themeName: 'shimmer',
  BgColor: tomato.tomato2,
  FontColor: tomato.tomato10,
};
