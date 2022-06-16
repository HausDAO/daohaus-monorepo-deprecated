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
  text: primaryDark.bg,
  bg: primaryDark.bgSolid,
  border: primaryDark.bgSolid,
  hoverBg: primaryDark.bgSolidHover,
  hoverBorder: primaryDark.bgSolidHover,
  focusBg: primaryDark.bgSolidHover,
  focusBorder: primaryDark.textLowContrast,
  disabledBg: primaryDark.elementBorderSubtle,
  disabledBorder: primaryDark.elementBorderSubtle,
};

export const SecondaryDarkButton: ButtonColorTargets = {
  text: secondaryDark.textHighContrast,
  bg: secondaryDark.elementBorderSubtle,
  border: secondaryDark.elementBorderSubtle,
  hoverBg: secondaryDark.elementBorder,
  hoverBorder: secondaryDark.elementBorder,
  focusBg: secondaryDark.elementBorder,
  focusBorder: secondaryDark.elementBorderHover,
  disabledBg: secondaryDark.elementBg,
  disabledBorder: secondaryDark.elementBg,
};

export const TertiaryDarkButton: ButtonColorTargets = {
  text: primaryDark.textLowContrast,
  bg: utilityDark.transparent,
  border: primaryDark.textLowContrast,
  hoverText: primaryDark.bgSolidHover,
  hoverBorder: primaryDark.bgSolidHover,
  focusText: primaryDark.textHighContrast,
  focusBorder: primaryDark.textHighContrast,
  disabledText: primaryDark.elementBorderSubtle,
  disabledBorder: primaryDark.elementBorderSubtle,
};

export const PrimaryLightButton: ButtonColorTargets = {
  text: primary.bg,
  bg: primary.bgSolid,
  border: primary.bgSolid,
  hoverBg: primary.bgSolidHover,
  hoverBorder: primary.bgSolidHover,
  focusBg: primary.bgSolidHover,
  focusBorder: primary.textLowContrast,
  disabledBg: primary.elementBorderSubtle,
  disabledBorder: primary.elementBorderSubtle,
};

export const SecondaryLightButton: ButtonColorTargets = {
  text: secondary.textHighContrast,
  bg: secondary.elementBorderSubtle,
  border: secondary.elementBorderSubtle,
  hoverBg: secondary.elementBorder,
  hoverBorder: secondary.elementBorder,
  focusBg: secondary.elementBorder,
  focusBorder: secondary.elementBorderHover,
  disabledBg: secondary.elementBg,
  disabledBorder: secondary.elementBg,
};

export const TertiaryLightButton: ButtonColorTargets = {
  bg: utility.transparent,
  text: primary.textLowContrast,
  border: primary.textLowContrast,
  hoverText: primary.bgSolidHover,
  hoverBorder: primary.bgSolidHover,
  focusText: primary.textHighContrast,
  focusBorder: primary.textHighContrast,
  disabledText: primary.elementBorderSubtle,
  disabledBorder: primary.elementBorderSubtle,
};
