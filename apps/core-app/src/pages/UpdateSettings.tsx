import { FormBuilder } from '@daohaus/haus-form-builder';
import { CustomFields } from '../legos/config';
import { FORM } from '../legos/form';

export function UpdateSettings() {
  return (
    <FormBuilder form={FORM.METADATA_SETTINGS} customFields={CustomFields} />
  );
}

export default UpdateSettings;
