import { Controller, useFormContext } from 'react-hook-form';
import type { SwitchWrapperProps } from '../../../types/formAndField';
import { Switch } from '../../atoms/Switch';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedSwitch = (props: SwitchWrapperProps) => {
  const { id, helperText, info, label, error, success, warning, switches } =
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
      {switches.map((switchProps) => (
        <Controller
          key={switchProps.id}
          name={switchProps.name || id}
          control={control}
          defaultValue={switchProps.defaultChecked}
          render={({ field }) => {
            return (
              <Switch
                {...field}
                {...switchProps}
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
