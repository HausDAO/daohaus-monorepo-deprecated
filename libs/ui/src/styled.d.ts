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
  outline?: string;
  outlineHover?: string;
  outlineFocus?: string;
  outlineDisabled?: string;
};

type ColorSteps = {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  step8: string;
  step9: string;
  step10: string;
  step11: string;
  step12: string;
};
declare module 'styled-components' {
  export interface DefaultTheme {
    themeName: string;
    bgColor: string;
    fontColor: string;
    primary: ColorSteps;
    secondary: ColorSteps;
    error: string;
    warning: string;
    warningBg: string;
    warningBorder: string;
    success: string;
    disabled: string;
    transparent: string;
    info: string;
    tint: {
      secondary: string;
    };
    navTabs: {
      bg: string;
      navLinkColor: string;
      navLinkHoverColor: string;
      navLinkSelected: string;
      navLinkDropdownText: string;
      hoverNavLinkDropdownBg: string;
      hoverNavLinkDropdownBorder: string;
      activeNavLinkDropdownBg: string;
      activeNavLinkDropdownBorder: string;
    };
    appSwitcher: {
      bg: string;
      navLinkColor: string;
      navLinkHoverColor: string;
      navLinkSelected: string;
      navLinkDropdownText: string;
      hoverNavLinkDropdownBg: string;
      hoverNavLinkDropdownBorder: string;
      activeNavLinkDropdownBg: string;
      activeNavLinkDropdownBorder: string;
    };
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
    collapsibleCard: {
      text: string;
      hoverText: string;
      focusText: string;
      bgInnerCard: string;
      borderInnerCard: string;
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
    fieldAlert: {
      bg: string;
      border: string;
      warningText: string;
      warningBg: string;
      warningBorder: string;
      warningButtonBg: string;
      warningButtonBorder: string;
    };
    button: {
      primary: ButtonColorTargets;
      secondary: ButtonColorTargets;
      tertiary: ButtonColorTargets;
      success: ButtonColorTargets;
      warning: ButtonColorTargets;
      danger: ButtonColorTargets;
    };
    link: {
      color: string;
    };
    progress: {
      bg: string;
    };
    tooltip: {
      bg: string;
    };
    dropdown: {
      text: string;
      textDisabled: string;
      bgMenu: string;
      bgItem: string;
      hoverItem: string;
      focusItem: string;
      acttiveItem: string;
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
    dialog: {
      bg: string;
      color: string;
    };
  }
}
