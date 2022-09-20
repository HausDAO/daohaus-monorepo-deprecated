import { useMemo } from 'react';

import { FormBuilder } from '@daohaus/haus-form-builder';
import { useConnectedMembership, useDao } from '@daohaus/dao-context';
import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';
import { NETWORK_TOKEN_ETH_ADDRESS } from '@daohaus/common-utilities';

export function RageQuit() {
  const { dao, refreshAll } = useDao();
  const { connectedMembership } = useConnectedMembership();

  const defaultFields = useMemo(() => {
    if (connectedMembership && dao) {
      return {
        to: connectedMembership.memberAddress,
        tokens: dao.tokenBalances
          .filter((token) => Number(token.balance) > 0)
          .map((token) => token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS),
      };
    }
  }, [connectedMembership, dao]);

  const onFormComplete = () => {
    refreshAll?.();
  };

  if (!dao || !connectedMembership) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...COMMON_FORMS.RAGEQUIT, log: true, devtool: true }}
      customFields={CustomFields}
      onSuccess={onFormComplete}
    />
  );
}

export default RageQuit;
