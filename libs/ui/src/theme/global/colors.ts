import {
  amber,
  amberDark,
  blue,
  blueDark,
  green,
  greenDark,
  indigo,
  indigoDark,
  orange,
  orangeDark,
  red,
  redDark,
  slate,
  slateDark,
} from '@radix-ui/colors';

/*
 * COLORS
 * We're leveraging Radix Colors (https://www.radix-ui.com/colors) for the DAO
 * Haus Component Lib. Additionally we're following the scale provided by Radix.
 * To understand why each alias is mapping to each number in the scale please
 * reference this doc (https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale).
 * Designs for DAO Haus Component Lib can be found here (figma.com/file/R1a1bwODnzCHHHw0EJALAU/DAOhaus-v3-Pattern-Library-(In-Progress)?node-id=1%3A3)
 */

// * Brand Colors

export const primary = {
  bg: amber.amber1,
  bgSubtle: amber.amber2,
  elementBg: amber.amber3,
  elementBgHover: amber.amber4,
  elementBgActive: amber.amber5,
  elementBorderSubtle: amber.amber6,
  elementBorder: amber.amber7,
  elementBorderHover: amber.amber8,
  bgSolid: amber.amber9,
  bgSolidHover: amber.amber10,
  textLowContrast: amber.amber11,
  textHighContrast: amber.amber12,
};

export const primaryDark = {
  bg: amberDark.amber1,
  bgSubtle: amberDark.amber2,
  elementBg: amberDark.amber3,
  elementBgHover: amberDark.amber4,
  elementBgActive: amberDark.amber5,
  elementBorderSubtle: amberDark.amber6,
  elementBorder: amberDark.amber7,
  elementBorderHover: amberDark.amber8,
  bgSolid: amberDark.amber9,
  bgSolidHover: amberDark.amber10,
  textLowContrast: amberDark.amber11,
  textHighContrast: amberDark.amber12,
};

export const secondary = {
  bg: indigo.indigo1,
  bgSubtle: indigo.indigo2,
  elementBg: indigo.indigo3,
  elementBgHover: indigo.indigo4,
  elementBgActive: indigo.indigo5,
  elementBorderSubtle: indigo.indigo6,
  elementBorder: indigo.indigo7,
  elementBorderHover: indigo.indigo8,
  bgSolid: indigo.indigo9,
  bgSolidHover: indigo.indigo10,
  textLowContrast: indigo.indigo11,
  textHighContrast: indigo.indigo12,
};

export const secondaryDark = {
  bg: indigoDark.indigo1,
  bgSubtle: indigoDark.indigo2,
  elementBg: indigoDark.indigo3,
  elementBgHover: indigoDark.indigo4,
  elementBgActive: indigoDark.indigo5,
  elementBorderSubtle: indigoDark.indigo6,
  elementBorder: indigoDark.indigo7,
  elementBorderHover: indigoDark.indigo8,
  bgSolid: indigoDark.indigo9,
  bgSolidHover: indigoDark.indigo10,
  textLowContrast: indigoDark.indigo11,
  textHighContrast: indigoDark.indigo12,
  tooltipBg: indigoDark.indigo6,
};

// * Neutral Colors

export const neutral = {
  bg: slate.slate1,
  bgSubtle: slate.slate2,
  elementBg: slate.slate3,
  elementBgHover: slate.slate4,
  elementBgActive: slate.slate5,
  elementBorderSubtle: slate.slate6,
  elementBorder: slate.slate7,
  elementBorderHover: slate.slate8,
  bgSolid: slate.slate9,
  bgSolidHover: slate.slate10,
  textLowContrast: slate.slate11,
  textHighContrast: slate.slate12,
};

export const neutralDark = {
  bg: slateDark.slate1,
  bgSubtle: slateDark.slate2,
  elementBg: slateDark.slate3,
  elementBgHover: slateDark.slate4,
  elementBgActive: slateDark.slate5,
  elementBorderSubtle: slateDark.slate6,
  elementBorder: slateDark.slate7,
  elementBorderHover: slateDark.slate8,
  bgSolid: slateDark.slate9,
  bgSolidHover: slateDark.slate10,
  textLowContrast: slateDark.slate11,
  textHighContrast: slateDark.slate12,
};

// * Utility Colors

export const utility = {
  success: green.green9,
  successText: green.green12,
  successBg: green.green3,
  successBorder: green.green7,
  warning: orange.orange9,
  warningText: orange.orange12,
  warningBg: orange.orange3,
  warningBorder: orange.orange7,
  danger: red.red9,
  dangerText: red.red12,
  dangerBg: red.red3,
  dangerBorder: red.red7,
  info: blue.blue9,
  transparent: 'transparent',
};

export const utilityDark = {
  success: greenDark.green9,
  successText: greenDark.green12,
  successBg: greenDark.green3,
  successBorder: greenDark.green7,
  warning: orangeDark.orange9,
  warningText: orangeDark.orange12,
  warningBg: orangeDark.orange3,
  warningBorder: orangeDark.orange7,
  danger: redDark.red9,
  dangerText: redDark.red12,
  dangerBg: redDark.red3,
  dangerBorder: redDark.red7,
  info: blueDark.blue9,
  transparent: 'transparent',
};
