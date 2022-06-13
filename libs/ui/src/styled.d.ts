import 'styled-components';

export type ButtonColorTargets = {
  text: string;
  bg: string;
  border?: string;
  hoverText?: string;
  hoverBg: string;
  hoverBorder?: string;
  focusText?: string;
  focusBg: string;
  focusBorder?: string;
  disabledText?: string;
  disabledBg: string;
  disabledBorder?: string;
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
      disabledColor: string;
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
    select: {
      bg: string;
      text: string;
      borderColor: string;
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
    radio: {
      item: {
        bg: string;
        border: string;
        activeBg: string;
        disabledBg: string;
        disabledBorder: string;
      };
      indicator: {
        bg: string;
        disabledBg: string;
      };
    };
  }
}
