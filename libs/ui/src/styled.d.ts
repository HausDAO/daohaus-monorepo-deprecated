import 'styled-components';

export type ButtonColorTargets = {
  text: string;
  bg: string;
  border: string;
  hoverText?: string;
  hoverBg?: string;
  hoverBorder: string;
  focusText?: string;
  focusBg?: string;
  focusBorder: string;
  disabledText?: string;
  disabledBg?: string;
  disabledBorder?: string;
};
declare module 'styled-components' {
  export interface DefaultTheme {
    themeName: string;
    bgColor: string;
    fontColor: string;
    primary: string;
    secondary: string;
    error: string;
    warning: string;
    success: string;
    disabled: string;
    transparent: string;
    info: string;
    card: {
      bg: string;
      border: string;
      hoverBg: string;
      hoverBorder: string;
      focusBg: string;
      focusBorder: string;
      disabledBg: string;
      disabledBorder: string;
      successText: string;
      successBg: string;
      successBorder: string;
      warningText: string;
      warningBg: string;
      warningBorder: string;
      errorText: string;
      errorBg: string;
      errorBorder: string;
    };
    field: {
      bg: string;
      border: string;
      placeholderText: string;
      hoverBg: string;
      hoverBorder: string;
      focusBg: string;
      focusBorder: string;
      disabledBg: string;
      disabledColor: string;
      disabledBorder: string;
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
      bg: string;
      border: string;
      hoverBg: string;
      hoverBorder: string;
      focusBg: string;
      focusBorder: string;
      disabledBg: string;
      disabledBorder: string;
      activeBg: string;
      activeBorder: string;
      activeHoverBg: string;
      activeHoverBorder: string;
      activeFocusBg: string;
      activeFocusBorder: string;
      activeDisabledBg: string;
      activeDisabledBorder: string;
    };
    select: {
      text: string;
      bg: string;
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
        activeDisabledBg: string;
      };
      thumb: {
        bg: string;
        border: string;
        hoverBg: string;
        hoverBorder: string;
        focusBg: string;
        focusBorder: string;
        disabledBg: string;
        disabledBorder: string;
        activeBg: string;
        activeBorder: string;
        activeHoverBg: string;
        activeHoverBorder: string;
        activeFocusBg: string;
        activeFocusBorder: string;
        activeDisabledBg: string;
        activeDisabledBorder: string;
      };
    };
    radio: {
      item: {
        bg: string;
        border: string;
        hoverBg: string;
        hoverBorder: string;
        focusBg: string;
        focusBorder: string;
        disabledBg: string;
        disabledBorder: string;
        activeBg: string;
        activeBorder: string;
        activeHoverBg: string;
        activeHoverBorder: string;
        activeFocusBg: string;
        activeFocusBorder: string;
        activeDisabledBg: string;
        activeDisabledBorder: string;
      };
      indicator: {
        bg: string;
        disabledBg: string;
      };
    };
    toast: {
      bg: string;
      border: string;
      successText: string;
      successBg: string;
      successBorder: string;
      warningText: string;
      warningBg: string;
      warningBorder: string;
      errorText: string;
      errorBg: string;
      errorBorder: string;
      icon: {
        default: string;
        success: string;
        warning: string;
        error: string;
      };
    };
  }
}
