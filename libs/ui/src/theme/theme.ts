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
    disabled: indigoDark.indigo2,
  },
<<<<<<< HEAD
  tooltip: {
    bg: indigoDark.indigo3,
  },
=======
>>>>>>> 99ef2bcfa8bafb46ac991237863af491b27b21da
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
<<<<<<< HEAD
    placeholderText: indigo.indigo8,
    disabled: indigo.indigo2,
  },
  tooltip: {
    bg: indigo.indigo3,
  },
=======
    placeholderText: indigo.indigo11,
    disabled: indigo.indigo2,
  },
>>>>>>> 99ef2bcfa8bafb46ac991237863af491b27b21da
};
