import { ParXs } from '../typography';
import { IconType } from 'react-icons';
import { WithIcon } from './helperTextStyles';
import React from 'react';
import { useTheme } from 'styled-components';
import { Theme } from '../../../types/theming';
import {
  ErrorMessage,
  WarningMessage,
  SuccessMessage,
} from '../../../types/formAndField';

import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';

export type HelperTextType = {
  color?: string;
  icon?: IconType;
  children: React.ReactNode;
};
export type SpecialHelperText = {
  children: React.ReactNode;
};
export type HelperTextFactoryProps = {
  error?: ErrorMessage;
  warning?: WarningMessage;
  success?: SuccessMessage;
  helperText?: string;
};
export const HelperText = ({ color, icon, children }: HelperTextType) => {
  if (icon) {
    const Icon = icon;
    return (
      <WithIcon>
        <Icon size="1.6rem" color={color} />
        <ParXs color={color}>{children}</ParXs>
      </WithIcon>
    );
  }
  return <ParXs color={color}>{children}</ParXs>;
};

export const SuccessText = ({ children }: SpecialHelperText) => {
  /*  Using 'as Theme' here because useTheme only seems to return a 
  'DefaultTheme' type, despite being initialized with a 'Theme' type.*/
  const theme = useTheme() as Theme;
  return (
    <HelperText color={theme.success} icon={BiCheckCircle}>
      {children}
    </HelperText>
  );
};

export const WarningText = ({ children }: SpecialHelperText) => {
  const theme = useTheme() as Theme;
  return (
    <HelperText color={theme.warning} icon={BiErrorCircle}>
      {children}
    </HelperText>
  );
};

export const ErrorText = ({ children }: SpecialHelperText) => {
  const theme = useTheme() as Theme;
  return (
    <HelperText color={theme.error} icon={BiErrorCircle}>
      {children}
    </HelperText>
  );
};

export const HelperTextFactory = ({
  error,
  success,
  warning,
  helperText,
}: HelperTextFactoryProps) => {
  if (!error && !success && !warning && !helperText) return null;

  if (error) return <ErrorText>{error.message}</ErrorText>;
  if (warning) return <WarningText>{warning.message}</WarningText>;
  if (success) return <SuccessText>{success.message}</SuccessText>;
  return <HelperText>{helperText}</HelperText>;
};
