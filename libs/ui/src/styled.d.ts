import 'styled-components';

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
    field: {
      bg: string;
      focus: string;
      placeholderText: string;
      disabled: string;
      disabledPlaceholder: string;
    };
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
  }
}
