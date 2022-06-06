import {
  amber,
  amberDark,
  indigo,
  indigoDark,
  slate,
  slateDark,
  grayDark,
} from '@radix-ui/colors';
import { Theme } from '../types/theming';

import {
  primary,
  primaryDark,
  secondary,
  secondaryDark,
  neutral,
  neutralDark,
  utility,
  utilityDark,
} from './global/colors';

import {
  PrimaryDarkButton,
  PrimaryLightButton,
  SecondaryDarkButton,
  SecondaryLightButton,
  TertiaryDarkButton,
  TertiaryLightButton,
} from './atoms/button';

export const defaultDarkTheme: Theme = {
  themeName: 'dark',
  bgColor: secondaryDark.bg,
  fontColor: secondaryDark.textHighContrast,
  primary: primaryDark.bgSolid,
  error: utilityDark.danger,
  warning: utilityDark.warning,
  success: utilityDark.success,
  disabled: neutralDark.bgSolidDisabled,
  transparent: utilityDark.transparent,
  info: utilityDark.info,
  field: {
    bg: indigoDark.indigo3,
    focus: indigoDark.indigo4,
    placeholderText: indigoDark.indigo11,
    disabled: slateDark.slate5,
    disabledPlaceholder: slateDark.slate10,
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
    bg: indigoDark.indigo2,
  },
  checkbox: {
    border: indigoDark.indigo12,
    activeBorder: amberDark.amber9,
  },
  spinner: {
    topColor: amberDark.amber9,
    bottomColor: amberDark.amber4,
  },
  switch: {
    bar: {
      bg: indigoDark.indigo6,
      activeBg: amberDark.amber6,
      disabledBg: grayDark.gray6,
    },
    thumb: {
      bg: indigoDark.indigo9,
      activeBg: amberDark.amber9,
      disabledBg: grayDark.gray9,
    },
  },
};

export const defaultLightTheme: Theme = {
  themeName: 'light',
  bgColor: secondary.bg,
  fontColor: secondary.textHighContrast,
  primary: primary.bgSolid,
  error: utility.danger,
  warning: utility.warning,
  success: utility.success,
  info: utility.info,
  transparent: utility.transparent,
  disabled: neutral.bgSolid,
  field: {
    bg: indigo.indigo3,
    focus: indigo.indigo4,
    placeholderText: indigo.indigo8,
    disabled: slate.slate5,
    disabledPlaceholder: slate.slate5,
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
  checkbox: {
    border: indigoDark.indigo12,
    activeBorder: amberDark.amber9,
  },
  spinner: {
    topColor: amber.amber9,
    bottomColor: amber.amber4,
  },
  switch: {
    bar: {
      bg: indigoDark.indigo6,
      activeBg: amberDark.amber6,
      disabledBg: grayDark.gray6,
    },
    thumb: {
      bg: indigoDark.indigo9,
      activeBg: amberDark.amber9,
      disabledBg: grayDark.gray9,
    },
  },
};
