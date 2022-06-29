import { useFormContext } from 'react-hook-form';
import { SelectProps } from '../../../types/formAndField';
import { Select } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedSelect = (props: SelectProps) => {
  const { id, registerOptions } = props;
  const { register } = useFormContext();
  const registration = registerOptions
    ? register(id, registerOptions)
    : register(id);
  return (
    <FieldWrapper {...props}>
      <Select {...registration} {...props} />
    </FieldWrapper>
  );
};
