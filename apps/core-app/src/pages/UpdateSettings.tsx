import { FormBuilder } from '@daohaus/haus-form-builder';
import { useDao } from '../contexts/DaoContext';
import { CustomFields } from '../legos/config';
import { FORM } from '../legos/form';

export function UpdateSettings() {
  const { dao } = useDao();
  const links = dao?.links && JSON.parse(dao?.links);
  const defaultFields = {
    name: dao?.name,
    icon: dao?.avatarImg,
    tags: dao?.tags?.join(', '),
    description: dao?.description,
    long_description: dao?.longDescription,
    ...links,
  };

  if (!dao) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...FORM.METADATA_SETTINGS, log: true }}
      customFields={CustomFields}
    />
  );
}

export default UpdateSettings;
