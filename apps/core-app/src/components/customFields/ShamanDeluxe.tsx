import { ComponentProps, useMemo } from 'react';
import styled from 'styled-components';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import {
  ignoreEmptyVal,
  isNumberish,
  SHAMAN_PERMISSIONS,
} from '@daohaus/common-utilities';
import { Buildable, DataSm, ShamanPermission } from '@daohaus/ui';

import { useDao } from '@daohaus/dao-context';

const Secondary = styled.span`
  color: ${(props) => props.theme.secondary.step9};
`;

const DeluxeBox = styled.div`
  p {
    margin-bottom: 1.2rem;
  }
`;

export const ShamanDeluxe = (
  props: Buildable<
    ComponentProps<typeof ShamanPermission> & { watchAddressField?: string }
  >
) => {
  const { id = 'shamanPermission', watchAddressField = 'shamanAddress' } =
    props;
  const { watch } = useFormContext();
  const { dao } = useDao();

  const [shamanPermission, shamanAddress] = watch([id, watchAddressField]);

  const oldShamanLevel = useMemo(() => {
    if (!dao || !shamanPermission || !shamanAddress) return;

    return dao?.shamen?.find((shaman) => shaman.shamanAddress === shamanAddress)
      ?.permissions;
  }, [dao, shamanPermission, shamanAddress]);

  const newRules: RegisterOptions = {
    validate: (val) =>
      ignoreEmptyVal(val, (val) => {
        if (oldShamanLevel == null) return true;
        return Number(oldShamanLevel) > Number(val)
          ? true
          : 'Shaman permission level can only go down';
      }),
    ...props.rules,
  };

  return (
    <>
      <ShamanPermission {...props} rules={newRules} />
      {isNumberish(shamanPermission) && isNumberish(oldShamanLevel) && (
        <DeluxeBox>
          <DataSm>
            <Secondary>Shamans Old Permission Level is:</Secondary>{' '}
            {SHAMAN_PERMISSIONS?.[Number(oldShamanLevel)]?.displayName}
          </DataSm>
          <DataSm>
            <Secondary>Shamans New Permission Level is:</Secondary>{' '}
            {SHAMAN_PERMISSIONS?.[Number(shamanPermission)]?.displayName}
            Only
          </DataSm>
        </DeluxeBox>
      )}
    </>
  );
};
