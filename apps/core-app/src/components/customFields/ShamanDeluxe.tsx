import { isNumberish, SHAMAN_PERMISSIONS } from '@daohaus/common-utilities';
import { Buildable, DataSm, ShamanPermission } from '@daohaus/ui';
import { ComponentProps, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { useDao } from '../../contexts/DaoContext';

const Secondary = styled.span`
  color: ${(props) => props.theme.secondary};
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

  const selectedShamanLevel = useMemo(() => {
    if (!dao || !shamanPermission || !shamanAddress) return;

    // Spelling error 'shamen' exists on the type definiton in Dao data.
    // This is a temporary fix until the type definition is updated.
    // Didin't want to break antything.
    return dao?.shamen?.find((shaman) => shaman.shamanAddress === shamanAddress)
      ?.permissions;
  }, [dao, shamanPermission, shamanAddress]);

  return (
    <>
      <ShamanPermission {...props} />
      {isNumberish(selectedShamanLevel) && isNumberish(shamanPermission) && (
        <DeluxeBox>
          <DataSm>
            <Secondary>Shamans Old Permission Level is:</Secondary>{' '}
            {SHAMAN_PERMISSIONS?.[Number(selectedShamanLevel)]?.displayName}
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
