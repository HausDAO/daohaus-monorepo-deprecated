import { useMemo } from 'react';

import { FormBuilder } from '@daohaus/haus-form-builder';
import { useDao } from '@daohaus/dao-context';
import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';

export function RageQuit() {
  const { dao } = useDao();

  //   const defaultFields = useMemo(() => {
  //     const links = dao ? dao?.links : {};
  //     return {
  //       name: dao?.name,
  //       icon: dao?.avatarImg,
  //       tags: dao?.tags?.join(', '),
  //       description: dao?.description,
  //       long_description: dao?.longDescription,
  //       ...links,
  //     };
  //   }, [dao]);

  console.log('dao', dao);

  if (!dao) {
    return null;
  }

  return (
    <FormBuilder
      //   defaultValues={defaultFields}
      form={{ ...COMMON_FORMS.METADATA_SETTINGS, log: true }}
      customFields={CustomFields}
    />
  );
}

export default RageQuit;
