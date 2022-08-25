import { useFormContext } from 'react-hook-form';
import { Buildable, Field } from '../../../types/formAndField';
import { Input } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedInput = ({ id, rules, ...props }: Buildable<Field>) => {
  if (id === 'shamanAddress') {
    console.log('id', id);
    console.log('props.disabled', props.disabled);
  }
  const { register } = useFormContext();
  return (
    <FieldWrapper {...props} id={id} rules={rules}>
      <Input {...props} {...register(id, rules)} id={id} />
    </FieldWrapper>
  );
};
