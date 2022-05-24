import { Controller, useFormContext } from 'react-hook-form';
import { SwitchProps } from '@radix-ui/react-switch';
import type { PrimitiveWrapper } from '../../../types/formAndField';
import { Switch } from '../../atoms/Switch';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

type SwitchComponentProps = SwitchProps & {
  fieldLabel: string;
  id?: string;
  className?: string;
};
type SwitchWrapperProps = PrimitiveWrapper & {
  switches: SwitchComponentProps[];
};

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
                switchOn={field.value}
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
