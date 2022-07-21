import { useFormContext } from 'react-hook-form';
import { Field } from '../../../types/formAndField';
import { Input } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedInput = (props: Field) => {
  const { id, registerOptions } = props;
  const { register } = useFormContext();
  const registration = registerOptions
    ? register(id, registerOptions)
    : register(id);

  console.log('id', id);
  return (
    <FieldWrapper {...props}>
      <Input {...registration} {...props} />
    </FieldWrapper>
  );
};
