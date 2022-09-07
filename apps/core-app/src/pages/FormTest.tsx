import { FormBuilder } from '@daohaus/haus-form-builder';
import { CustomFields } from '../legos/config';
import { COMMON_FORMS, TABULA_FORMS } from '../legos/form';

export function FormTest() {
  return (
    <FormBuilder form={TABULA_FORMS.PUBLISH} customFields={CustomFields} />
  );
}

export default FormTest;
