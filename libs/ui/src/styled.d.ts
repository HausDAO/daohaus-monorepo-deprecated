import 'styled-components';

import { FildColorTarget } from './theme/atoms/field';

export type CheckboxColorTargets = {
  bg: string;
  border: string;
  activeBorder: string;
  disabled: string;
};

export type ButtonColorTargets = {
  bg: string;
  text: string;
  border: string;
  hoverBg: string;
  hoverText: string;
  hoverBorder: string;
  focusBg: string;
  focusText: string;
  focusBorder: string;
  activeBg: string;
  activeText: string;
  activeBorder: string;
  disabledBg: string;
  disabledText: string;
  disabledBorder: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    themeName: string;
    bgColor: string;
    fontColor: string;
    primary: string;
    error: string;
    warning: string;
    success: string;
    disabled: string;
    transparent: string;
    info: string;
    field: FildColorTarget;
    button: {
      primary: ButtonColorTargets;
      secondary: ButtonColorTargets;
      tertiary: ButtonColorTargets;
    };
    tooltip: {
      bg: string;
    };
    dropdown: {
      bg: string;
    };
    checkbox: {
      border: string;
      activeBorder: string;
    };
    spinner: {
      topColor: string;
      bottomColor: string;
    };
    switch: {
      bar: {
        bg: string;
        activeBg: string;
        disabledBg: string;
      };
      thumb: {
        bg: string;
        activeBg: string;
        disabledBg: string;
      };
    };
  }
}
