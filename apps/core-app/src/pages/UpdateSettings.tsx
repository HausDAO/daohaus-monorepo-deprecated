import { FormBuilder } from '@daohaus/haus-form-builder';
import { useMemo } from 'react';
import { useDao } from '../contexts/DaoContext';
import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';

export function UpdateSettings() {
  const { dao } = useDao();

  const defaultFields = useMemo(() => {
    const links = dao ? dao?.links : {};
    return {
      name: dao?.name,
      icon: dao?.avatarImg,
      tags: dao?.tags?.join(', '),
      description: dao?.description,
      long_description: dao?.longDescription,
      ...links,
    };
  }, [dao]);

  if (!dao) {
    // TODO handle loading state
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...COMMON_FORMS.METADATA_SETTINGS, log: true }}
      customFields={CustomFields}
    />
  );
}

export default UpdateSettings;
