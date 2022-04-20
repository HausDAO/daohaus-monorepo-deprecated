import {
  amber,
  amberDark,
  grass,
  grassDark,
  indigo,
  indigoDark,
  sky,
  skyDark,
  tomato,
  tomatoDark,
} from '@radix-ui/colors';
import { Theme } from '../types/theming';

export const defaultDarkTheme: Theme = {
  themeName: 'dark',
  bgColor: indigoDark.indigo1,
  fontColor: indigoDark.indigo12,
  primary: amberDark.amber9,
  error: tomatoDark.tomato9,
  warning: amberDark.amber9,
  success: grassDark.grass9,
  info: skyDark.sky9,
  field: {
    bg: indigoDark.indigo3,
    focus: indigoDark.indigo4,
    placeholderText: indigoDark.indigo11,
  },
};

export const defaultLightTheme: Theme = {
  themeName: 'dark',
  bgColor: indigo.indigo1,
  fontColor: indigo.indigo12,
  primary: amber.amber9,
  error: tomato.tomato9,
  warning: amber.amber9,
  success: grass.grass9,
  info: sky.sky9,
  field: {
    bg: indigo.indigo3,
    focus: indigo.indigo4,
    placeholderText: indigo.indigo11,
  },
};
