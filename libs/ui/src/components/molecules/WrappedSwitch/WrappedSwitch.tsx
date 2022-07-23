import { Controller, useFormContext } from 'react-hook-form';
import { SwitchProps } from '@radix-ui/react-switch';
import type { Buildable } from '../../../types/formAndField';
import { Switch } from '../../atoms/Switch';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

type SwitchComponentProps = SwitchProps & {
  fieldLabel: string;
  id?: string;
  className?: string;
  disabled?: boolean;
};

export const WrappedSwitch = (
  props: Buildable<{ switches: SwitchComponentProps[] }>
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
            key={switchProps.id || id}
            name={switchProps.id || id}
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
