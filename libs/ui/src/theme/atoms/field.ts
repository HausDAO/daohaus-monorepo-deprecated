import {
  secondary,
  secondaryDark,
  neutral,
  neutralDark,
} from '../global/colors';

export type FildColorTarget = {
  bg: string;
  focus: string;
  placeholderText: string;
  disabled: string;
  disabledPlaceholder: string;
};

export const FieldTheme: FildColorTarget = {
  bg: secondary.elementBg,
  focus: secondary.elementBgHover,
  placeholderText: secondary.elementBorderHover,
  disabled: neutral.elementBgActive,
  disabledPlaceholder: neutral.bgSolidHover,
};

export const FieldThemeDark: FildColorTarget = {
  bg: secondaryDark.elementBg,
  focus: secondaryDark.elementBgHover,
  placeholderText: secondaryDark.textLowContrast,
  disabled: neutralDark.elementBgActive,
  disabledPlaceholder: neutralDark.bgSolidHover,
};
