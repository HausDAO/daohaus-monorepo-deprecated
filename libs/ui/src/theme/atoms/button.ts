import { ButtonColorTargets } from '../../styled';
import {
  primary,
  secondary,
  primaryDark,
  secondaryDark,
  utility,
  utilityDark,
  success,
  successDark,
  warning,
  warningDark,
  danger,
  dangerDark,
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

export const SuccessDarkButton: ButtonColorTargets = {
  text: successDark.step1,
  bg: successDark.step9,
  border: successDark.step9,
  hoverBg: successDark.step10,
  hoverBorder: successDark.step10,
  focusBg: successDark.step10,
  focusBorder: successDark.step11,
  disabledBg: successDark.step6,
  disabledBorder: successDark.step6,
};

export const WarningDarkButton: ButtonColorTargets = {
  text: warningDark.step1,
  bg: warningDark.step9,
  border: warningDark.step9,
  hoverBg: warningDark.step10,
  hoverBorder: warningDark.step10,
  focusBg: warningDark.step10,
  focusBorder: warningDark.step11,
  disabledBg: warningDark.step6,
  disabledBorder: warningDark.step6,
};

export const DangerDarkButton: ButtonColorTargets = {
  text: dangerDark.step1,
  bg: dangerDark.step9,
  border: dangerDark.step9,
  hoverBg: dangerDark.step10,
  hoverBorder: dangerDark.step10,
  focusBg: dangerDark.step10,
  focusBorder: dangerDark.step11,
  disabledBg: dangerDark.step6,
  disabledBorder: dangerDark.step6,
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

export const SuccessLightButton: ButtonColorTargets = {
  text: success.step1,
  bg: success.step9,
  border: success.step9,
  hoverBg: success.step10,
  hoverBorder: success.step10,
  focusBg: success.step10,
  focusBorder: success.step11,
  disabledBg: success.step6,
  disabledBorder: success.step6,
};

export const WarningLightButton: ButtonColorTargets = {
  text: warning.step1,
  bg: warning.step9,
  border: warning.step9,
  hoverBg: warning.step10,
  hoverBorder: warning.step10,
  focusBg: warning.step10,
  focusBorder: warning.step11,
  disabledBg: warning.step6,
  disabledBorder: warning.step6,
};

export const DangerLightButton: ButtonColorTargets = {
  text: danger.step1,
  bg: danger.step9,
  border: danger.step9,
  hoverBg: danger.step10,
  hoverBorder: danger.step10,
  focusBg: danger.step10,
  focusBorder: danger.step11,
  disabledBg: danger.step6,
  disabledBorder: danger.step6,
};
