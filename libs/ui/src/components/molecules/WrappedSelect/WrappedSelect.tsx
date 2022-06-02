import { useFormContext } from 'react-hook-form';
import { SelectProps } from '../../../types/formAndField';
import { Select } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedSelect = (props: SelectProps) => {
  const { id } = props;
  const { register } = useFormContext();
  return (
    <FieldWrapper {...props}>
      <Select {...register(id)} {...props} />
    </FieldWrapper>
  );
};
