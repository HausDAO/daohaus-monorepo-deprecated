import { useFormContext } from 'react-hook-form';
import { Buildable, Field } from '../../../types/formAndField';
import { Input } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedInput = ({ id, rules, ...props }: Buildable<Field>) => {
  const { register } = useFormContext();
  console.log('rules', rules);
  return (
    <FieldWrapper {...props} id={id} rules={rules}>
      <Input {...props} ref={register(rules)} id={id} />
    </FieldWrapper>
  );
};
