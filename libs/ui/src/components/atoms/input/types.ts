import { Field } from '../../../types/formAndField';
import { IconType } from 'react-icons';
import { FunctionComponent } from 'react';

export type InputType = FunctionComponent<
  Field & {
    icon?: IconType;
    long?: boolean;
    full?: boolean;
    number: boolean;
  }
>;
