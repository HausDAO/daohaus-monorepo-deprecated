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
  disabledColor: string;
  disabledPlaceholder: string;
};

export const FieldTheme: FieldColorTarget = {
  bg: secondary.step3,
  border: secondary.step3,
  placeholderText: secondary.step11,
  hoverBg: secondary.step4,
  hoverBorder: secondary.step4,
  focusBg: secondary.step3,
  focusBorder: secondary.step6,
  disabledBg: neutral.step5,
  disabledBorder: neutral.step5,
  disabledColor: neutral.step11,
  disabledPlaceholder: neutral.step10,
};

export const FieldThemeDark: FieldColorTarget = {
  bg: secondaryDark.step3,
  border: secondaryDark.step3,
  placeholderText: secondaryDark.step11,
  hoverBg: secondaryDark.step4,
  hoverBorder: secondaryDark.step4,
  focusBg: secondaryDark.step3,
  focusBorder: secondaryDark.step6,
  disabledBg: neutralDark.step5,
  disabledBorder: neutralDark.step5,
  disabledColor: neutralDark.step11,
  disabledPlaceholder: neutralDark.step10,
};
