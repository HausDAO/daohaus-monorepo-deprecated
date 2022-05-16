import { useFormContext } from 'react-hook-form';
import type { CheckboxWrapperField } from '../../../types/formAndField';
import { Checkbox } from '../../atoms/Checkbox';
import { FieldWrapper } from '../inputWrapper/fieldWrapper';

export const WrappedCheckbox = (props: CheckboxWrapperField) => {
  const {
    id,
    type,
    placeholder,
    helperText,
    info,
    label,
    error,
    success,
    warning,
    checkboxes,
  } = props;
  const { register } = useFormContext();
  return (
    <FieldWrapper
      id={id}
      type={type}
      placeholder={placeholder}
      helperText={helperText}
      info={info}
      label={label}
      error={error}
      success={success}
      warning={warning}
    >
      {checkboxes.map((checkbox) => {
        return <Checkbox {...register(checkbox.id)} {...checkbox} />;
      })}
    </FieldWrapper>
  );
};
