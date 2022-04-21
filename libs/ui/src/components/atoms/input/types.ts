import { Field } from '../../../types/formAndField';
import { IconType } from 'react-icons';

export type InputType = Field & {
  icon?: IconType;
  long?: boolean;
  full?: boolean;
  number: boolean;
};
