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

// * Utility Colors (New Naming convention)
export const info = {
  step1: blue.blue1,
  step2: blue.blue2,
  step3: blue.blue3,
  step4: blue.blue4,
  step5: blue.blue5,
  step6: blue.blue6,
  step7: blue.blue7,
  step8: blue.blue8,
  step9: blue.blue9,
  step10: blue.blue10,
  step11: blue.blue11,
  step12: blue.blue12,
};

export const infoDark = {
  step1: blueDark.blue1,
  step2: blueDark.blue2,
  step3: blueDark.blue3,
  step4: blueDark.blue4,
  step5: blueDark.blue5,
  step6: blueDark.blue6,
  step7: blueDark.blue7,
  step8: blueDark.blue8,
  step9: blueDark.blue9,
  step10: blueDark.blue10,
  step11: blueDark.blue11,
  step12: blueDark.blue12,
};

export const success = {
  step1: green.green1,
  step2: green.green2,
  step3: green.green3,
  step4: green.green4,
  step5: green.green5,
  step6: green.green6,
  step7: green.green7,
  step8: green.green8,
  step9: green.green9,
  step10: green.green10,
  step11: green.green11,
  step12: green.green12,
};

export const successDark = {
  step1: greenDark.green1,
  step2: greenDark.green2,
  step3: greenDark.green3,
  step4: greenDark.green4,
  step5: greenDark.green5,
  step6: greenDark.green6,
  step7: greenDark.green7,
  step8: greenDark.green8,
  step9: greenDark.green9,
  step10: greenDark.green10,
  step11: greenDark.green11,
  step12: greenDark.green12,
};

export const warning = {
  step1: orange.orange1,
  step2: orange.orange2,
  step3: orange.orange3,
  step4: orange.orange4,
  step5: orange.orange5,
  step6: orange.orange6,
  step7: orange.orange7,
  step8: orange.orange8,
  step9: orange.orange9,
  step10: orange.orange10,
  step11: orange.orange11,
  step12: orange.orange12,
};

export const warningDark = {
  step1: orangeDark.orange1,
  step2: orangeDark.orange2,
  step3: orangeDark.orange3,
  step4: orangeDark.orange4,
  step5: orangeDark.orange5,
  step6: orangeDark.orange6,
  step7: orangeDark.orange7,
  step8: orangeDark.orange8,
  step9: orangeDark.orange9,
  step10: orangeDark.orange10,
  step11: orangeDark.orange11,
  step12: orangeDark.orange12,
};

export const danger = {
  step1: red.red1,
  step2: red.red2,
  step3: red.red3,
  step4: red.red4,
  step5: red.red5,
  step6: red.red6,
  step7: red.red7,
  step8: red.red8,
  step9: red.red9,
  step10: red.red10,
  step11: red.red11,
  step12: red.red12,
};

export const dangerDark = {
  step1: red.red1,
  step2: red.red2,
  step3: red.red3,
  step4: red.red4,
  step5: red.red5,
  step6: red.red6,
  step7: red.red7,
  step8: red.red8,
  step9: red.red9,
  step10: red.red10,
  step11: red.red11,
  step12: red.red12,
};
