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
import {
  PrimaryDarkButton,
  PrimaryLightButton,
  SecondaryDarkButton,
  SecondaryLightButton,
  TertiaryDarkButton,
  TertiaryLightButton,
} from './component/button';

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
    disabled: indigoDark.indigo2,
  },
  button: {
    primary: PrimaryDarkButton,
    secondary: SecondaryDarkButton,
    tertiary: TertiaryDarkButton,
  },
  tooltip: {
    bg: indigoDark.indigo3,
  },
  dropdown: {
    bg: indigoDark.indigo3,
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
    placeholderText: indigo.indigo8,
    disabled: indigo.indigo2,
  },
  button: {
    primary: PrimaryLightButton,
    secondary: SecondaryLightButton,
    tertiary: TertiaryLightButton,
  },
  tooltip: {
    bg: indigo.indigo3,
  },
  dropdown: {
    bg: indigo.indigo2,
  },
};
