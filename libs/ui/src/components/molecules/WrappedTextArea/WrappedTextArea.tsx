import { useFormContext } from 'react-hook-form';
import { Field } from '../../../types/formAndField';
import { TextArea } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedTextArea = (props: Field) => {
  const { id, registerOptions } = props;
  const { register } = useFormContext();
  const registration = registerOptions
    ? register(id, registerOptions)
    : register(id);

  return (
    <FieldWrapper {...props}>
      <TextArea {...registration} {...props} />
    </FieldWrapper>
  );
};
