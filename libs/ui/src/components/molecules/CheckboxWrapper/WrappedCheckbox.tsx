import { useForm, Controller } from 'react-hook-form';
import type { CheckboxWrapperProps } from '../../../types/formAndField';
import { Checkbox } from '../../atoms/Checkbox';
import { FieldWrapper } from '../inputWrapper/fieldWrapper';

export const WrappedCheckbox = (props: CheckboxWrapperProps) => {
  const { id, helperText, info, label, error, success, warning, checkboxes } =
    props;
  const { control } = useForm();
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
      {checkboxes.map((checkbox) => (
        <Controller
          key={checkbox.id}
          name={checkbox.name || id}
          control={control}
          defaultValue={checkbox.defaultChecked}
          render={({ field }) => {
            return (
              <Checkbox
                {...field}
                {...checkbox}
                value={field.value}
                checked={field.value}
                onCheckedChange={field.onChange}
                ref={field.ref}
              />
            );
          }}
        />
      ))}
    </FieldWrapper>
  );
};
