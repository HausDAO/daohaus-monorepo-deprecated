import { ButtonColorTargets } from '../../styled';
import {
  primary,
  secondary,
  primaryDark,
  secondaryDark,
  utility,
  utilityDark,
} from '../global/colors';

export const PrimaryDarkButton: ButtonColorTargets = {
  bg: primaryDark.bgSolid,
  text: primaryDark.bg,
  hoverBg: primaryDark.bgSolidHover,
  focusBg: primaryDark.bgSolidHover,
  focusBorder: primaryDark.textLowContrast,
  disabledBg: primaryDark.elementBorderSubtle,
};

export const SecondaryDarkButton: ButtonColorTargets = {
  bg: secondaryDark.elementBg,
  text: secondaryDark.textHighContrast,
  border: secondaryDark.elementBgHover,
  hoverBg: secondaryDark.elementBorderSubtle,
  focusBg: secondaryDark.elementBgHover,
  focusBorder: secondaryDark.textLowContrast,
  disabledBg: secondaryDark.elementBg,
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
  disabledBg: utilityDark.transparent,
  disabledText: primaryDark.elementBorderHover,
  disabledBorder: primaryDark.elementBorderHover,
};

export const PrimaryLightButton: ButtonColorTargets = {
  bg: primary.bgSolid,
  text: secondary.textHighContrast,
  border: primary.bgSolid,
  hoverBg: primary.bgSolidHover,
  hoverBorder: primary.bgSolidHover,
  focusBg: primary.bgSolidHover,
  focusBorder: primary.textLowContrast,
  disabledBg: primary.elementBorderHover,
  disabledBorder: primary.elementBorderHover,
};

export const SecondaryLightButton: ButtonColorTargets = {
  bg: secondary.elementBgHover,
  text: secondary.textHighContrast,
  border: secondary.elementBgHover,
  hoverBg: secondary.elementBorderSubtle,
  hoverBorder: secondary.elementBorderSubtle,
  focusBg: secondary.elementBgHover,
  focusBorder: secondary.textLowContrast,
  disabledBg: secondary.elementBg,
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
  disabledBg: utility.transparent,
  disabledText: primary.elementBorderHover,
  disabledBorder: primary.elementBorderHover,
};
