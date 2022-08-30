import 'styled-components';
import {
  primary,
  primaryDark,
  secondary,
  secondaryDark,
  neutral,
  neutralDark,
} from '../global/colors';

export type CheckboxColorTargets = {
  bg: string;
  border: string;
  activeBorder: string;
  hoverBg: string;
  hoverBorder: string;
  focusBg: string;
  focusBorder: string;
  disabledBg: string;
  disabledBorder: string;
};

export const LightCheckbox: CheckboxColorTargets = {
  bg: secondary.step3,
  border: secondary.step6,
  activeBorder: primary.step9,
  hoverBg: secondary.step4,
  hoverBorder: secondary.step4,
  focusBg: secondary.step3,
  focusBorder: secondary.step6,
  disabledBg: neutral.step2,
  disabledBorder: neutral.step6,
};

export const DarkCheckbox: CheckboxColorTargets = {
  bg: secondaryDark.step3,
  border: secondaryDark.step6,
  activeBorder: primaryDark.step9,
  hoverBg: secondaryDark.step4,
  hoverBorder: secondaryDark.step4,
  focusBg: secondaryDark.step3,
  focusBorder: secondaryDark.step6,
  disabledBg: neutralDark.step2,
  disabledBorder: neutralDark.step6,
};
