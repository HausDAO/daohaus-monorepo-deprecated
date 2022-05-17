import { useFormContext, Controller } from 'react-hook-form';
import type { CheckboxWrapperProps } from '../../../types/formAndField';
import { Checkbox } from '../../atoms/Checkbox';
import { FieldWrapper } from '../inputWrapper/fieldWrapper';

export const WrappedCheckbox = (props: CheckboxWrapperProps) => {
  const { id, helperText, info, label, error, success, warning, checkboxes } =
    props;
  const { register } = useFormContext();
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
      {checkboxes.map((checkbox) => {
        return (
          <Checkbox
            key={checkbox.id}
            {...register(checkbox.name ? checkbox.name : id)}
            {...checkbox}
          />
        );
      })}
    </FieldWrapper>
  );
};
