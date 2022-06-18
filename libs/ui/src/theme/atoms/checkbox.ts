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
  bg: secondary.elementBg,
  border: secondary.elementBorderSubtle,
  activeBorder: primary.bgSolid,
  hoverBg: secondary.elementBgHover,
  hoverBorder: secondary.elementBgHover,
  focusBg: secondary.elementBg,
  focusBorder: secondary.elementBorderSubtle,
  disabledBg: neutral.bgSubtle,
  disabledBorder: neutral.elementBorderSubtle,
};

export const DarkCheckbox: CheckboxColorTargets = {
  bg: secondaryDark.elementBg,
  border: secondaryDark.elementBorderSubtle,
  activeBorder: primaryDark.bgSolid,
  hoverBg: secondaryDark.elementBgHover,
  hoverBorder: secondaryDark.elementBgHover,
  focusBg: secondaryDark.elementBg,
  focusBorder: secondaryDark.elementBorderSubtle,
  disabledBg: neutralDark.bgSubtle,
  disabledBorder: neutralDark.elementBorderSubtle,
};
