import { Controller, useFormContext } from 'react-hook-form';
import type { Buildable, Switchable } from '../../../types/formAndField';
import { Switch } from '../../atoms/Switch';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedSwitch = (
  props: Buildable<Switchable>
) => {
  const {
    id,
    helperText,
    info,
    label,
    error,
    success,
    warning,
    switches,
    disabled,
    rules,
  } = props;
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
      {switches.map((switchProps) => {
        return (
          <Controller
            key={switchProps.id}
            name={switchProps.id}
            rules={rules}
            control={control}
            defaultValue={switchProps.defaultChecked}
            render={({ field }) => {
              return (
                <Switch
                  {...field}
                  {...switchProps}
                  switchOn={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                  ref={field.ref}
                />
              );
            }}
          />
        );
      })}
    </FieldWrapper>
  );
};
