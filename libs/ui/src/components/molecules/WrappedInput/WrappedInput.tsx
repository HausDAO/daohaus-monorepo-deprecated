import { useFormContext } from 'react-hook-form';
import { Buildable, Field } from '../../../types/formAndField';
import { Input } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedInput = ({ id, rules, ...props }: Buildable<Field>) => {
  const { register } = useFormContext();

  return (
    <FieldWrapper {...props} id={id}>
      <Input {...register(id, rules)} {...props} id={id} />
    </FieldWrapper>
  );
};
