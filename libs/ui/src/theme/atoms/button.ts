import {
  primary,
  secondary,
  primaryDark,
  secondaryDark,
  utility,
  utilityDark,
} from '../global/colors';

export type ButtonColorTargets = {
  bg: string;
  text: string;
  border: string;
  hoverBg: string;
  hoverText: string;
  hoverBorder: string;
  focusBg: string;
  focusText: string;
  focusBorder: string;
  activeBg: string;
  activeText: string;
  activeBorder: string;
  disabledBg: string;
  disabledText: string;
  disabledBorder: string;
};

export const PrimaryDarkButton: ButtonColorTargets = {
  bg: primaryDark.bgSolid,
  text: secondaryDark.bg,
  border: primaryDark.bgSolid,
  hoverBg: primaryDark.bgSolidHover,
  hoverText: secondaryDark.bg,
  hoverBorder: primaryDark.bgSolidHover,
  focusBg: primaryDark.bgSolidHover,
  focusText: secondaryDark.bg,
  focusBorder: primaryDark.textLowContrast,
  activeBg: primaryDark.bgSolid,
  activeText: secondaryDark.bg,
  activeBorder: primaryDark.bgSolid,
  disabledBg: primaryDark.elementBorderHover,
  disabledText: secondaryDark.bg,
  disabledBorder: primaryDark.elementBorderHover,
};

export const SecondaryDarkButton: ButtonColorTargets = {
  bg: secondaryDark.elementBg,
  text: secondaryDark.textHighContrast,
  border: secondaryDark.elementBgHover,
  hoverBg: secondaryDark.elementBorderSubtle,
  hoverText: secondaryDark.textHighContrast,
  hoverBorder: secondaryDark.elementBorderSubtle,
  focusBg: secondaryDark.elementBgHover,
  focusText: secondaryDark.textHighContrast,
  focusBorder: secondaryDark.textLowContrast,
  activeBg: secondaryDark.elementBgHover,
  activeText: secondaryDark.textHighContrast,
  activeBorder: secondaryDark.elementBgHover,
  disabledBg: secondaryDark.elementBg,
  disabledText: secondaryDark.elementBorderHover,
  disabledBorder: secondaryDark.elementBgHover,
};

export const TertiaryDarkButton: ButtonColorTargets = {
  bg: utilityDark.transparent,
  text: primaryDark.textLowContrast,
  border: primaryDark.bgSolid,
  hoverBg: secondaryDark.elementBg,
  hoverText: primaryDark.bgSolidHover,
  hoverBorder: primaryDark.bgSolid,
  focusBg: utilityDark.transparent,
  focusText: primaryDark.bgSolidHover,
  focusBorder: primaryDark.textHighContrast,
  activeBg: utilityDark.transparent,
  activeText: primaryDark.textLowContrast,
  activeBorder: primaryDark.bgSolid,
  disabledBg: utilityDark.transparent,
  disabledText: primaryDark.elementBorderHover,
  disabledBorder: primaryDark.elementBorderHover,
};

export const PrimaryLightButton: ButtonColorTargets = {
  bg: primary.bgSolid,
  text: secondary.textHighContrast,
  border: primary.bgSolid,
  hoverBg: primary.bgSolidHover,
  hoverText: secondary.textHighContrast,
  hoverBorder: primary.bgSolidHover,
  focusBg: primary.bgSolidHover,
  focusText: secondary.textHighContrast,
  focusBorder: primary.textLowContrast,
  activeBg: primary.bgSolid,
  activeText: secondary.textHighContrast,
  activeBorder: primary.bgSolid,
  disabledBg: primary.elementBorderHover,
  disabledText: secondary.textHighContrast,
  disabledBorder: primary.elementBorderHover,
};

export const SecondaryLightButton: ButtonColorTargets = {
  bg: secondary.elementBgHover,
  text: secondary.textHighContrast,
  border: secondary.elementBgHover,
  hoverBg: secondary.elementBorderSubtle,
  hoverText: secondary.textHighContrast,
  hoverBorder: secondary.elementBorderSubtle,
  focusBg: secondary.elementBgHover,
  focusText: secondary.textHighContrast,
  focusBorder: secondary.textLowContrast,
  activeBg: secondary.elementBgHover,
  activeText: secondary.textHighContrast,
  activeBorder: secondary.elementBgHover,
  disabledBg: secondary.elementBg,
  disabledText: secondary.elementBorderHover,
  disabledBorder: secondary.elementBgHover,
};

export const TertiaryLightButton: ButtonColorTargets = {
  bg: utility.transparent,
  text: primary.textLowContrast,
  border: primary.bgSolid,
  hoverBg: secondary.elementBg,
  hoverText: primary.bgSolidHover,
  hoverBorder: primary.bgSolid,
  focusBg: utility.transparent,
  focusText: primary.bgSolidHover,
  focusBorder: primary.textHighContrast,
  activeBg: utility.transparent,
  activeText: primary.textLowContrast,
  activeBorder: primary.bgSolid,
  disabledBg: utility.transparent,
  disabledText: primary.elementBorderHover,
  disabledBorder: primary.elementBorderHover,
};
