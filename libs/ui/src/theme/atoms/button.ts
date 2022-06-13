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
  bg: secondaryDark.elementBorderSubtle,
  text: secondaryDark.textHighContrast,
  hoverBg: secondaryDark.elementBorder,
  focusBg: secondaryDark.elementBorder,
  focusBorder: secondaryDark.elementBorderHover,
  disabledBg: secondaryDark.elementBg,
};

export const TertiaryDarkButton: ButtonColorTargets = {
  bg: utilityDark.transparent,
  text: primaryDark.textLowContrast,
  border: primaryDark.textLowContrast,
  hoverText: primaryDark.bgSolidHover,
  hoverBorder: primaryDark.bgSolidHover,
  focusText: primaryDark.textHighContrast,
  focusBorder: primaryDark.textHighContrast,
  disabledText: primaryDark.elementBorderSubtle,
  disabledBorder: primaryDark.elementBorderSubtle,
};

export const PrimaryLightButton: ButtonColorTargets = {
  bg: primary.bgSolid,
  text: primary.bg,
  hoverBg: primary.bgSolidHover,
  focusBg: primary.bgSolidHover,
  focusBorder: primary.textLowContrast,
  disabledBg: primary.elementBorderSubtle,
};

export const SecondaryLightButton: ButtonColorTargets = {
  bg: secondary.elementBorderSubtle,
  text: secondary.textHighContrast,
  hoverBg: secondary.elementBorder,
  focusBg: secondary.elementBorder,
  focusBorder: secondary.elementBorderHover,
  disabledBg: secondary.elementBg,
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
