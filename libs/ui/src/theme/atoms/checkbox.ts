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
  disabledBg: string;
  disabledBorder: string;
};

export const LightCheckbox: CheckboxColorTargets = {
  bg: secondary.elementBg,
  border: secondary.elementBorderSubtle,
  activeBorder: primary.bgSolid,
  disabledBg: neutral.bgSubtle,
  disabledBorder: neutral.elementBorderSubtle,
};

export const DarkCheckbox: CheckboxColorTargets = {
  bg: secondaryDark.elementBg,
  border: secondaryDark.elementBorderSubtle,
  activeBorder: primaryDark.bgSolid,
  disabledBg: neutralDark.bgSubtle,
  disabledBorder: neutralDark.elementBorderSubtle,
};
