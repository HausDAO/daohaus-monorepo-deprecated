import { DialogContentProps } from '@radix-ui/react-dialog';
import { ButtonProps } from '../components/atoms';

export type ModalProps = DialogContentProps & {
  title: string;
  description?: string;
  alignButtons?: 'start' | 'end';
  leftButton?: ButtonProps;
  rightButton?: ButtonProps;
};
