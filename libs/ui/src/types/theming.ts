export type Theme = {
  themeName: string;
  bgColor: string;
  fontColor: string;
  primary: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  field: {
    bg: string;
    focus: string;
    placeholderText: string;
    disabled: string;
  };
  button: {
    primary: string;
    primaryHover: string;
    primaryText: string;
    primaryActive: string;
    primaryFocus: string;
    primaryFocusBorder: string;
    secondary: string;
    secondaryHover: string;
    secondaryText: string;
    secondaryActive: string;
    secondaryFocus: string;
    secondaryFocusBorder: string;
  };
  tooltip: {
    bg: string;
  };
};
