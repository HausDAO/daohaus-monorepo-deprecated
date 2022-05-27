import { useFormContext } from 'react-hook-form';
import { Field } from '../../../types/formAndField';
import { TextArea } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedTextArea = (props: Field) => {
  const { id } = props;
  const { register } = useFormContext();

  return (
    <FieldWrapper {...props}>
      <TextArea {...register(id)} {...props} />
    </FieldWrapper>
  );
};
