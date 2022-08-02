import { useFormContext } from 'react-hook-form';
import { Buildable, SelectProps } from '../../../types/formAndField';
import { Select } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedSelect = ({
  id,
  rules,
  ...props
}: Buildable<SelectProps>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper {...props} id={id}>
      <Select {...register(id, rules)} {...props} id={id} />
    </FieldWrapper>
  );
};
