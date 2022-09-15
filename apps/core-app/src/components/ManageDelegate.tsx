import { useMemo } from 'react';
import { FormBuilder } from '@daohaus/haus-form-builder';
import { useConnectedMembership, useDao } from '@daohaus/dao-context';

import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';

export const ManageDelegate = () => {
  const { connectedMembership } = useConnectedMembership();
  const { refreshAll } = useDao();

  const defaultValues = useMemo(() => {
    if (
      connectedMembership &&
      connectedMembership.delegatingTo !== connectedMembership.memberAddress
    ) {
      return connectedMembership;
    }
  }, [connectedMembership]);

  const onFormComplete = () => {
    refreshAll?.();
  };

  if (!connectedMembership) return null;

  return (
    <FormBuilder
      defaultValues={defaultValues}
      form={COMMON_FORMS.MANAGE_DELEGATE}
      customFields={CustomFields}
      onSuccess={onFormComplete}
    />
  );
};

export default ManageDelegate;
