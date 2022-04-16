import { sky } from '@radix-ui/colors';
import { Color as DefaultColor } from './global/color';

export const defaultDarkTheme = { ...DefaultColor, themeName: 'dark' };
export type Theme = typeof defaultDarkTheme;

export const defaultLightTheme: Theme = {
  Bg: sky.sky1,
  Font: sky.sky12,
  themeName: 'light',
};
