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
  SecondaryDarkButton,
  TertiaryDarkButton,
  SuccessDarkButton,
  WarningDarkButton,
  DangerDarkButton,
  PrimaryLightButton,
  SecondaryLightButton,
  TertiaryLightButton,
  SuccessLightButton,
  WarningLightButton,
  DangerLightButton,
} from './atoms/button';
import { FieldTheme, FieldThemeDark } from './atoms/field';
import { AppSwitcherDark, AppSwitcherLight } from './organisms/app-switcher';
import { DropdownDark, DropdownLight } from './molecules/dropdown';
import { orangeDark } from '@radix-ui/colors';

export const defaultDarkTheme: Theme = {
  themeName: 'dark',
  bgColor: neutralDark.bg,
  fontColor: secondaryDark.textHighContrast,
  primary: primaryDark.bgSolid,
  secondary: secondary.bgSolid,
  error: utilityDark.danger,
  warning: utilityDark.warning,
  warningBg: utilityDark.warningBg,
  warningBorder: utilityDark.warningBorder,
  success: utilityDark.success,
  disabled: neutralDark.bgSolid,
  transparent: 'transparent',
  info: utilityDark.info,
  tint: {
    secondary: secondaryDark.textLowContrast,
  },
  // *** ATOMS *** //
  button: {
    primary: PrimaryDarkButton,
    secondary: SecondaryDarkButton,
    tertiary: TertiaryDarkButton,
    success: SuccessDarkButton,
    warning: WarningDarkButton,
    danger: DangerDarkButton,
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
  fieldAlert: {
    bg: primaryDark.elementBg,
    border: primaryDark.elementBorderSubtle,
    warningText: orangeDark.orange10,
    warningBg: orangeDark.orange2,
    warningBorder: orangeDark.orange5,
    warningButtonBg: utilityDark.warning,
    warningButtonBorder: utilityDark.warning,
  },
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
  collapsibleCard: {
    text: primaryDark.textLowContrast,
    hoverText: primaryDark.bgSolidHover,
    focusText: primaryDark.textHighContrast,
    bgInnerCard: secondaryDark.elementBgActive,
    borderInnerCard: secondaryDark.elementBorderSubtle,
  },
  dropdown: DropdownDark,
  dialog: {
    bg: secondaryDark.bgSubtle,
    color: secondaryDark.textHighContrast,
  },
  tooltip: {
    bg: secondaryDark.elementBorderSubtle,
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
  warningBg: utility.warningBg,
  warningBorder: utility.warningBorder,
  success: utility.success,
  info: utility.info,
  transparent: utility.transparent,
  disabled: neutral.bgSolid,
  tint: {
    secondary: secondary.elementBorder,
  },
  // *** ATOMS *** //
  button: {
    primary: PrimaryLightButton,
    secondary: SecondaryLightButton,
    tertiary: TertiaryLightButton,
    success: SuccessLightButton,
    warning: WarningLightButton,
    danger: DangerLightButton,
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
  fieldAlert: {
    bg: primary.elementBg,
    border: primary.elementBorderSubtle,
    warningText: orangeDark.orange10,
    warningBg: orangeDark.orange2,
    warningBorder: orangeDark.orange5,
    warningButtonBg: utilityDark.warning,
    warningButtonBorder: utilityDark.warning,
  },
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
  collapsibleCard: {
    text: primary.textLowContrast,
    hoverText: primary.bgSolidHover,
    focusText: primary.textHighContrast,
    bgInnerCard: secondary.elementBgActive,
    borderInnerCard: secondary.elementBorderSubtle,
  },
  dropdown: DropdownLight,
  dialog: {
    bg: secondary.bgSubtle,
    color: secondary.textHighContrast,
  },
  tooltip: {
    bg: secondary.elementBorderSubtle,
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
