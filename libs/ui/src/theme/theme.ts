import { sky } from '@radix-ui/colors';
import { Color as DefaultColor } from './global/color';

export const defaultDarkTheme = { ...DefaultColor, themeName: 'dark' };
export type Theme = typeof defaultDarkTheme;

export const defaultLightTheme: Theme = {
  BgColor: sky.sky1,
  FontColor: sky.sky12,
  themeName: 'light',
};
