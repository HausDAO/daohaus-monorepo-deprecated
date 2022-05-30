import { Controller, useFormContext } from 'react-hook-form';
import {
  RadioGroupProps,
  RadioGroupItemProps,
} from '@radix-ui/react-radio-group';
import type { PrimitiveWrapper } from '../../../types/formAndField';
import { Radio } from '../../atoms/Radio';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

type RadioProps = { label: string; id?: string } & RadioGroupItemProps;

type RadioGroupComponentProps = RadioGroupProps & {
  id?: string;
  className?: string;
  radios: RadioProps[];
};
type RadioGroupWrapperProps = PrimitiveWrapper & {
  radioGroup: RadioGroupComponentProps;
};

export const WrappedRadio = (props: RadioGroupWrapperProps) => {
  const { id, helperText, info, label, error, success, warning, radioGroup } =
    props;
  const { control } = useFormContext();
  return (
    <FieldWrapper
      id={id}
      helperText={helperText}
      info={info}
      label={label}
      error={error}
      success={success}
      warning={warning}
    >
      <Controller
        key={radioGroup.id}
        name={radioGroup.name || id}
        control={control}
        defaultValue={radioGroup.defaultValue}
        render={({ field }) => {
          return <Radio {...field} {...radioGroup} ref={field.ref} />;
        }}
      />
    </FieldWrapper>
  );
};
