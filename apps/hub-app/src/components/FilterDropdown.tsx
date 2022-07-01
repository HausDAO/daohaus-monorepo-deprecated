import { MouseEvent, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiFilterFill } from 'react-icons/ri';

import { Button, Dropdown, DropdownItem, Theme } from '@daohaus/ui';
import { ParSm } from '@daohaus/ui';
import { networkData } from '@daohaus/common-utilities';
import { indigoDark } from '@radix-ui/colors';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { Member_Filter } from '@daohaus/dao-data';

const DropdownButton = styled(Button)`
  &.selected {
    background-color: ${(props: { theme: Theme }) => props.theme.secondary};
  }
`;

const IconFilter = styled(RiFilterFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

type FilterDropdownProps = {
  filterNetworks: Record<string, string>;
  toggleNetworkFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  filterDelegate: Member_Filter | '';
  toggleDelegateFilter: (event: MouseEvent<HTMLButtonElement>) => void;
};

const FilterDropdown = ({
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
}: FilterDropdownProps) => {
  const theme = useTheme();
  const { address } = useHausConnect();
  const filterKey = useMemo(
    () => ({
      isDelegate: `{ memberAddress: ${address}, delegateShares_gt: '0' }`,
      isDelagating: `{ memberAddress: ${address}, delegatingTo_not: ${address} }`,
    }),
    [address]
  );
  const networkButtons = Object.values(networkData).map(
    (network): DropdownItem => {
      const isActive = filterNetworks[network.chainId];
      return {
        type: 'clickable',
        content: (
          <DropdownButton
            key={network.chainId}
            value={network.chainId}
            onClick={toggleNetworkFilter}
            className={isActive ? 'selected' : ''}
            secondary
            fullWidth
            leftAlign
            IconRight={isActive ? AiOutlineCheck : undefined}
          >
            <div style={{ width: '100%' }}>{network.name}</div>
          </DropdownButton>
        ),
      };
    }
  );

  return (
    <Dropdown
      align="end"
      width="25rem"
      spacing=".6rem"
      bg={theme.button.secondary.bg}
      trigger={
        <Button secondary IconLeft={IconFilter}>
          Filters
        </Button>
      }
      items={[
        { type: 'label', content: <ParSm>Networks</ParSm> },
        ...networkButtons,
        {
          type: 'label',
          content: <ParSm>Delegation</ParSm>,
        },
        {
          type: 'clickable',
          content: (
            <DropdownButton
              secondary
              fullWidth
              leftAlign
              value=""
              onClick={toggleDelegateFilter}
              IconRight={
                filterDelegate === filterKey.isDelegate
                  ? AiOutlineCheck
                  : undefined
              }
              className={
                filterDelegate === filterKey.isDelegate ? 'selected' : ''
              }
            >
              <div style={{ width: '100%' }}>I am a Delegate</div>
            </DropdownButton>
          ),
        },
        {
          type: 'clickable',
          content: (
            <DropdownButton
              secondary
              fullWidth
              leftAlign
              value="iAmDelegating"
              onClick={toggleDelegateFilter}
              IconRight={
                filterDelegate === filterKey.isDelagating
                  ? AiOutlineCheck
                  : undefined
              }
              className={
                filterDelegate === filterKey.isDelagating ? 'selected' : ''
              }
            >
              <div style={{ width: '100%' }}>I have a Delegate</div>
            </DropdownButton>
          ),
        },
      ]}
    />
  );
};

export default FilterDropdown;
