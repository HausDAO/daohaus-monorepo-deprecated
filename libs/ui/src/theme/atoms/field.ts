import {
  secondary,
  secondaryDark,
  neutral,
  neutralDark,
} from '../global/colors';

export type FieldColorTarget = {
  bg: string;
  border: string;
  hoverBg: string;
  hoverBorder: string;
  focusBg: string;
  focusBorder: string;
  placeholderText: string;
  disabledBg: string;
  disabledBorder: string;
  disabledPlaceholder: string;
};

export const FieldTheme: FieldColorTarget = {
  bg: secondary.elementBg,
  border: secondary.elementBg,
  placeholderText: secondary.textLowContrast,
  hoverBg: secondary.elementBgHover,
  hoverBorder: secondary.elementBgHover,
  focusBg: secondary.elementBg,
  focusBorder: secondary.elementBgActive,
  disabledBg: neutral.elementBgActive,
  disabledBorder: neutral.elementBgActive,
  disabledPlaceholder: neutral.bgSolidHover,
};

export const FieldThemeDark: FieldColorTarget = {
  bg: secondaryDark.elementBg,
  border: secondaryDark.elementBg,
  placeholderText: secondaryDark.textLowContrast,
  hoverBg: secondaryDark.elementBgHover,
  hoverBorder: secondaryDark.elementBgHover,
  focusBg: secondaryDark.elementBg,
  focusBorder: secondaryDark.elementBorderSubtle,
  disabledBg: neutralDark.elementBgActive,
  disabledBorder: neutralDark.elementBgActive,
  disabledPlaceholder: neutralDark.bgSolidHover,
};
