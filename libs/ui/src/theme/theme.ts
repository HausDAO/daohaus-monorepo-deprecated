import { sky, tomato, tomatoDark } from '@radix-ui/colors';
import { Color as DefaultColor } from './global/color';

export const defaultDarkTheme = { ...DefaultColor, themeName: 'dark' };
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
