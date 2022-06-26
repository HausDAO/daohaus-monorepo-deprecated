import {
  ToastProps,
  ToastProviderProps,
  ToastViewportProps,
} from '@radix-ui/react-toast';

export type ToastLinksProps = {
  actionAltText?: string;
  leftLink?: {
    path: string;
    text: string;
  };
  rightLink?: {
    path: string;
    text: string;
  };
};

type IconType = 'success' | 'warning' | 'error';

export type CustomToastProps = ToastProps &
  ToastProviderProps &
  ToastViewportProps & {
    title: string;
    description?: string;
    success?: boolean;
    warning?: boolean;
    error?: boolean;
    iconType?: IconType;
    ariaLabelClose?: string;
    toastLinks?: ToastLinksProps;
  };
