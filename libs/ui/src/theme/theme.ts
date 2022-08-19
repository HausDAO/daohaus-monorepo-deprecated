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
import { AppSwitcherDark, AppSwitcherLight } from './organisms/app-switcher';
import { DropdownDark, DropdownLight } from './molecules/dropdown';

export const defaultDarkTheme: Theme = {
  themeName: 'dark',
  bgColor: neutralDark.bg,
  fontColor: secondaryDark.textHighContrast,
  primary: primaryDark.bgSolid,
  secondary: secondary.bgSolid,
  error: utilityDark.danger,
  warning: utilityDark.warning,
  success: utilityDark.success,
  disabled: neutralDark.bgSolid,
  transparent: utilityDark.transparent,
  info: utilityDark.info,
  // *** ATOMS *** //
  button: {
    primary: PrimaryDarkButton,
    secondary: SecondaryDarkButton,
    tertiary: TertiaryDarkButton,
  },
  card: {
    bg: secondaryDark.bgSubtle,
    border: secondaryDark.elementBgActive,
    hoverBg: secondaryDark.elementBg,
    hoverBorder: secondaryDark.elementBorderSubtle,
    focusBg: secondaryDark.bgSubtle,
    focusBorder: secondaryDark.elementBorder,
    disabledBg: neutralDark.bgSubtle,
    disabledBorder: neutralDark.elementBgActive,
    successText: utilityDark.successText,
    successBg: utilityDark.successBg,
    successBorder: utilityDark.successBorder,
    warningText: utilityDark.warningText,
    warningBg: utilityDark.warningBg,
    warningBorder: utilityDark.warningBorder,
    errorText: utilityDark.dangerText,
    errorBg: utilityDark.dangerBg,
    errorBorder: utilityDark.dangerBorder,
  },
  checkbox: {
    bg: secondaryDark.elementBg,
    border: secondaryDark.elementBorderSubtle,
    hoverBg: secondaryDark.elementBgHover,
    hoverBorder: secondaryDark.elementBorderSubtle,
    focusBg: secondaryDark.elementBg,
    focusBorder: secondaryDark.elementBorder,
    disabledBg: neutralDark.bgSubtle,
    disabledBorder: neutralDark.elementBorderSubtle,
    activeBg: primaryDark.elementBg,
    activeBorder: primaryDark.bgSolid,
    activeHoverBg: primaryDark.elementBgHover,
    activeHoverBorder: primaryDark.bgSolid,
    activeFocusBg: primaryDark.elementBg,
    activeFocusBorder: primaryDark.bgSolidHover,
    activeDisabledBg: neutralDark.bgSubtle,
    activeDisabledBorder: neutralDark.bgSolid,
  },
  field: FieldThemeDark,
  link: {
    color: primaryDark.bgSolidHover,
  },
  radio: {
    item: {
      bg: secondaryDark.elementBg,
      border: secondaryDark.elementBorderSubtle,
      hoverBg: secondaryDark.elementBgHover,
      hoverBorder: secondaryDark.elementBorderSubtle,
      focusBg: secondaryDark.elementBg,
      focusBorder: secondaryDark.elementBorder,
      disabledBg: neutralDark.bgSubtle,
      disabledBorder: neutralDark.elementBorderSubtle,
      activeBg: primaryDark.bgSolid,
      activeBorder: primaryDark.bgSolid,
      activeHoverBg: primaryDark.bgSolidHover,
      activeHoverBorder: primaryDark.bgSolidHover,
      activeFocusBg: primaryDark.bgSolid,
      activeFocusBorder: primaryDark.textLowContrast,
      activeDisabledBg: neutralDark.bgSolid,
      activeDisabledBorder: neutralDark.bgSolid,
    },
    indicator: {
      bg: primaryDark.elementBg,
      disabledBg: neutralDark.bg,
    },
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
      disabledBg: neutralDark.elementBorderSubtle,
      activeDisabledBg: neutralDark.elementBorderSubtle,
    },
    thumb: {
      bg: secondaryDark.bgSolid,
      border: secondaryDark.bgSolid,
      hoverBg: secondaryDark.bgSolidHover,
      hoverBorder: secondaryDark.bgSolidHover,
      focusBg: secondaryDark.bgSolid,
      focusBorder: secondaryDark.textLowContrast,
      disabledBg: neutralDark.bgSolid,
      disabledBorder: neutralDark.bgSolid,
      activeBg: primaryDark.bgSolid,
      activeBorder: primaryDark.bgSolid,
      activeHoverBg: primaryDark.bgSolidHover,
      activeHoverBorder: primaryDark.bgSolidHover,
      activeFocusBg: primaryDark.bgSolid,
      activeFocusBorder: primaryDark.textLowContrast,
      activeDisabledBg: neutralDark.bgSolid,
      activeDisabledBorder: neutralDark.bgSolid,
    },
  },
  // *** MOLECULES *** //
  dropdown: DropdownDark,
  collapsibleCard: {
    bg: secondaryDark.bgSubtle,
    bgInnerCard: secondaryDark.elementBgActive,
    border: secondaryDark.bgSubtle,
    borderInnerCard: secondaryDark.elementBorderSubtle,
    hoverBg: secondaryDark.elementBg,
    hoverBorder: secondaryDark.elementBorderSubtle,
    focusBg: secondaryDark.bgSubtle,
    focusBorder: secondaryDark.elementBorder,
  },
  tooltip: {
    bg: secondaryDark.elementBg,
  },
  toast: {
    bg: secondaryDark.elementBg,
    border: secondaryDark.elementBgActive,
    successText: utilityDark.successText,
    successBg: utilityDark.successBg,
    successBorder: utilityDark.successBorder,
    warningText: utilityDark.warningText,
    warningBg: utilityDark.warningBg,
    warningBorder: utilityDark.warningBorder,
    errorText: utilityDark.dangerText,
    errorBg: utilityDark.dangerBg,
    errorBorder: utilityDark.dangerBorder,
    icon: {
      default: utilityDark.success,
      success: utilityDark.success,
      warning: utilityDark.warning,
      error: utilityDark.danger,
    },
  },
  // *** ORGANISMS *** //
  navTabs: {
    bg: secondaryDark.bgSubtle,
    navLinkColor: secondaryDark.bgSolid,
    navLinkHoverColor: secondaryDark.bgSolidHover,
    navLinkSelected: secondaryDark.textHighContrast,
    navLinkDropdownText: secondaryDark.textHighContrast,
    hoverNavLinkDropdownBg: secondaryDark.elementBgHover,
    hoverNavLinkDropdownBorder: secondaryDark.elementBorderHover,
    activeNavLinkDropdownBg: secondaryDark.bgSolid,
    activeNavLinkDropdownBorder: secondaryDark.elementBorderSubtle,
  },
  appSwitcher: AppSwitcherDark,
};

export const defaultLightTheme: Theme = {
  themeName: 'light',
  bgColor: secondary.bg,
  fontColor: secondary.textHighContrast,
  primary: primary.bgSolid,
  secondary: secondary.bgSolid,
  error: utility.danger,
  warning: utility.warning,
  success: utility.success,
  info: utility.info,
  transparent: utility.transparent,
  disabled: neutral.bgSolid,
  // *** ATOMS *** //
  button: {
    primary: PrimaryLightButton,
    secondary: SecondaryLightButton,
    tertiary: TertiaryLightButton,
  },
  card: {
    bg: secondary.bgSubtle,
    border: secondary.elementBgActive,
    hoverBg: secondary.elementBg,
    hoverBorder: secondary.elementBorderSubtle,
    focusBg: secondary.bgSubtle,
    focusBorder: secondary.elementBorder,
    disabledBg: neutral.bgSubtle,
    disabledBorder: neutral.elementBgActive,
    successText: utility.successText,
    successBg: utility.successBg,
    successBorder: utility.successBorder,
    warningText: utility.warningText,
    warningBg: utility.warningBg,
    warningBorder: utility.warningBorder,
    errorText: utility.dangerText,
    errorBg: utility.dangerBg,
    errorBorder: utility.dangerBorder,
  },
  checkbox: {
    bg: secondary.elementBg,
    border: secondary.elementBorderSubtle,
    hoverBg: secondary.elementBgHover,
    hoverBorder: secondary.elementBorderSubtle,
    focusBg: secondary.elementBg,
    focusBorder: secondary.elementBorder,
    disabledBg: neutral.bgSubtle,
    disabledBorder: neutral.elementBorderSubtle,
    activeBg: primaryDark.elementBg,
    activeBorder: primaryDark.bgSolid,
    activeHoverBg: primaryDark.elementBgHover,
    activeHoverBorder: primaryDark.bgSolid,
    activeFocusBg: primaryDark.elementBg,
    activeFocusBorder: primaryDark.bgSolidHover,
    activeDisabledBg: neutral.bgSubtle,
    activeDisabledBorder: neutral.bgSolid,
  },
  field: FieldTheme,
  link: {
    color: primaryDark.bgSolidHover,
  },
  radio: {
    item: {
      bg: secondary.elementBg,
      border: secondary.elementBorderSubtle,
      hoverBg: secondary.elementBgHover,
      hoverBorder: secondary.elementBorderSubtle,
      focusBg: secondary.elementBg,
      focusBorder: secondary.elementBorder,
      disabledBg: neutral.bgSubtle,
      disabledBorder: neutral.elementBorderSubtle,
      activeBg: primaryDark.bgSolid,
      activeBorder: primaryDark.bgSolid,
      activeHoverBg: primaryDark.bgSolidHover,
      activeHoverBorder: primaryDark.bgSolidHover,
      activeFocusBg: primaryDark.bgSolid,
      activeFocusBorder: primaryDark.textLowContrast,
      activeDisabledBg: neutral.bgSolid,
      activeDisabledBorder: neutral.bgSolid,
    },
    indicator: {
      bg: primaryDark.elementBg,
      disabledBg: neutral.bg,
    },
  },
  select: {
    bg: secondary.elementBg,
    text: secondary.textLowContrast,
    borderColor: utility.transparent,
  },
  spinner: {
    topColor: primaryDark.bgSolid,
    bottomColor: primaryDark.elementBgHover,
  },
  switch: {
    bar: {
      bg: secondary.elementBorderSubtle,
      activeBg: primaryDark.elementBorderSubtle,
      disabledBg: neutral.elementBorderSubtle,
      activeDisabledBg: neutral.elementBorderSubtle,
    },
    thumb: {
      bg: secondary.bgSolid,
      border: secondary.bgSolid,
      hoverBg: secondary.bgSolidHover,
      hoverBorder: secondary.bgSolidHover,
      focusBg: secondary.bgSolid,
      focusBorder: secondary.textLowContrast,
      disabledBg: neutral.bgSolid,
      disabledBorder: neutral.bgSolid,
      activeBg: primaryDark.bgSolid,
      activeBorder: primaryDark.bgSolid,
      activeHoverBg: primaryDark.bgSolidHover,
      activeHoverBorder: primaryDark.bgSolidHover,
      activeFocusBg: primaryDark.bgSolid,
      activeFocusBorder: primaryDark.textLowContrast,
      activeDisabledBg: neutral.bgSolid,
      activeDisabledBorder: neutral.bgSolid,
    },
  },
  // *** MOLECULES *** //
  dropdown: DropdownLight,
  tooltip: {
    bg: secondary.elementBg,
  },
  toast: {
    bg: secondary.elementBg,
    border: secondary.elementBgActive,
    successText: utility.successText,
    successBg: utility.successBg,
    successBorder: utility.successBorder,
    warningText: utility.warningText,
    warningBg: utility.warningBg,
    warningBorder: utility.warningBorder,
    errorText: utility.dangerText,
    errorBg: utility.dangerBg,
    errorBorder: utility.dangerBorder,
    icon: {
      default: utility.success,
      success: utility.success,
      warning: utility.warning,
      error: utility.danger,
    },
  },
  // *** ORGANISMS *** //
  navTabs: {
    bg: secondary.bgSubtle,
    navLinkColor: secondary.bgSolid,
    navLinkHoverColor: secondary.bgSolidHover,
    navLinkSelected: secondary.textHighContrast,
    navLinkDropdownText: secondary.textHighContrast,
    hoverNavLinkDropdownBg: secondary.elementBgHover,
    hoverNavLinkDropdownBorder: secondary.elementBorderHover,
    activeNavLinkDropdownBg: secondary.bgSolid,
    activeNavLinkDropdownBorder: secondary.elementBorderSubtle,
  },
  appSwitcher: AppSwitcherLight,
};
