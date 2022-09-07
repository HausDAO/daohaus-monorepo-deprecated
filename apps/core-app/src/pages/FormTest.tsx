import { FormBuilder } from '@daohaus/haus-form-builder';
import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';

export function FormTest() {
  return (
    <FormBuilder
      form={COMMON_FORMS.METADATA_SETTINGS}
      customFields={CustomFields}
    />
  );
}

export default FormTest;
