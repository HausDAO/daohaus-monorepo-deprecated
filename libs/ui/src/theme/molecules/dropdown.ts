import {
  secondaryDark,
  neutralDark,
  secondary,
  neutral,
} from '../global/colors';

export const DropdownDark = {
  text: secondaryDark.textHighContrast,
  textDisabled: neutralDark.textLowContrast,
  bgMenu: secondaryDark.elementBg,
  bgItem: secondaryDark.elementBg,
  hoverItem: secondaryDark.elementBgHover,
  focusItem: secondaryDark.elementBgActive,
  acttiveItem: secondaryDark.bgSolid,
};

export const DropdownLight = {
  text: secondary.textHighContrast,
  textDisabled: neutral.textLowContrast,
  bgMenu: secondary.elementBg,
  bgItem: secondary.elementBg,
  hoverItem: secondary.elementBgHover,
  focusItem: secondary.elementBgActive,
  acttiveItem: secondary.bgSolid,
};
