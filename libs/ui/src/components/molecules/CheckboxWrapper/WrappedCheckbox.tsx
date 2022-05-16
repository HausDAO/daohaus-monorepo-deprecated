import { useFormContext } from 'react-hook-form';
import type { CheckboxInput } from '../../../types/formAndField';
import { Checkbox } from '../../atoms/Checkbox';
import { FieldWrapper } from '../inputWrapper/fieldWrapper';

export const WrappedCheckbox = (props: CheckboxInput) => {
  const { id } = props;
  const { register } = useFormContext();
  return (
    <FieldWrapper {...props}>
      <Checkbox {...register(id)} {...props} />
    </FieldWrapper>
  );
};
