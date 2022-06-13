import { grayDark } from '@radix-ui/colors';
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
import { FieldTheme, FieldThemeDark } from './atoms/field';

export const defaultDarkTheme: Theme = {
  themeName: 'dark',
  bgColor: neutralDark.bg,
  fontColor: secondaryDark.textHighContrast,
  primary: primaryDark.bgSolid,
  error: utilityDark.danger,
  warning: utilityDark.warning,
  success: utilityDark.success,
  disabled: neutralDark.bgSolid,
  transparent: utilityDark.transparent,
  info: utilityDark.info,
  field: FieldThemeDark,
  button: {
    primary: PrimaryDarkButton,
    secondary: SecondaryDarkButton,
    tertiary: TertiaryDarkButton,
  },
  tooltip: {
    bg: secondaryDark.elementBg,
  },
  dropdown: {
    bg: secondaryDark.bgSubtle,
  },
  checkbox: {
    bg: secondaryDark.elementBg,
    border: secondaryDark.elementBorderSubtle,
    activeBorder: primaryDark.bgSolid,
    disabledBg: neutralDark.bgSubtle,
    disabledBorder: neutralDark.elementBorderSubtle,
  },
  select: {
    bg: secondaryDark.elementBg,
    text: secondaryDark.textLowContrast,
    borderColor: utilityDark.transparent,
  },
  spinner: {
    topColor: primaryDark.bgSolid,
    bottomColor: primaryDark.elementBgHover,
  },
  switch: {
    bar: {
      bg: secondaryDark.elementBorderSubtle,
      activeBg: primaryDark.elementBorderSubtle,
      disabledBg: grayDark.gray6,
    },
    thumb: {
      bg: secondaryDark.bgSolid,
      activeBg: primaryDark.bgSolid,
      disabledBg: grayDark.gray9,
    },
  },
  radio: {
    item: {
      bg: secondaryDark.elementBg,
      border: secondaryDark.elementBorderSubtle,
      activeBg: primaryDark.bgSolid,
      disabledBg: neutralDark.bgSubtle,
      disabledBorder: neutralDark.elementBorderSubtle,
    },
    indicator: {
      bg: primaryDark.elementBorderSubtle,
      disabledBg: neutral.bg,
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
  field: FieldTheme,
  button: {
    primary: PrimaryLightButton,
    secondary: SecondaryLightButton,
    tertiary: TertiaryLightButton,
  },
  tooltip: {
    bg: secondary.elementBg,
  },
  dropdown: {
    bg: secondary.bgSubtle,
  },
  checkbox: {
    bg: secondary.elementBg,
    border: secondary.elementBorderSubtle,
    activeBorder: primary.bgSolid,
    disabledBg: neutral.bgSubtle,
    disabledBorder: neutral.elementBorderSubtle,
  },
  select: {
    bg: secondary.elementBg,
    text: secondary.textLowContrast,
    borderColor: utility.transparent,
  },
  spinner: {
    topColor: primary.bgSolid,
    bottomColor: primary.elementBgHover,
  },
  switch: {
    bar: {
      bg: secondary.elementBorderSubtle,
      activeBg: primary.elementBorderSubtle,
      disabledBg: neutral.elementBorderSubtle,
    },
    thumb: {
      bg: secondary.bgSolid,
      activeBg: primary.bgSolid,
      disabledBg: neutral.bgSolid,
    },
  },
  radio: {
    item: {
      bg: secondary.elementBg,
      border: secondary.elementBorderSubtle,
      activeBg: primary.bgSolid,
      disabledBg: neutral.bgSubtle,
      disabledBorder: neutral.elementBorderSubtle,
    },
    indicator: {
      bg: primary.elementBorderSubtle,
      disabledBg: neutral.bg,
    },
  },
};
