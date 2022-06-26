import { useContext } from 'react';
import { HausThemeContext } from '../theme';

export const useToast = () => {
  const { setToast } = useContext(HausThemeContext);

  const errorToast = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }): void => {
    setToast({
      title,
      description,
      error: true,
      iconType: 'error',
    });
  };
  const successToast = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }): void => {
    setToast({
      title,
      description,
      success: true,
      iconType: 'success',
    });
  };
  const warningToast = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }): void => {
    setToast({
      title,
      description,
      warning: true,
      iconType: 'warning',
    });
  };

  return {
    setToast,
    errorToast,
    successToast,
    warningToast,
  };
};
