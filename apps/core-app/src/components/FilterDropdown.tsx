import { MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiFilterFill } from 'react-icons/ri';

import { Button, Dropdown, DropdownMenuItem, Theme } from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';
import { PROPOSAL_FILTERS } from '../utils/constants';

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
  // filter: Record<string, string>;
  filter: string;
  toggleFilter: (event: MouseEvent<HTMLButtonElement>) => void;
};

const FilterDropdown = ({ filter, toggleFilter }: FilterDropdownProps) => {
  const theme = useTheme();

  return (
    <Dropdown
      align="start"
      menuBg={theme.button.secondary.bg}
      menuMinWidth="25rem"
      spacing=".6rem"
      trigger={
        <Button secondary IconLeft={IconFilter}>
          Filter{filter && `: ${PROPOSAL_FILTERS[filter]}`}
        </Button>
      }
    >
      {Object.keys(PROPOSAL_FILTERS).map((filterKey) => {
        return (
          <DropdownMenuItem asChild>
            <DropdownButton
              secondary
              fullWidth
              leftAlign
              value={filterKey}
              onClick={toggleFilter}
              IconRight={filter === filterKey ? AiOutlineCheck : undefined}
              className={filter === filterKey ? 'selected' : ''}
            >
              {/* <div style={{ width: '100%' }}>I am a Delegate</div>
               */}
              {PROPOSAL_FILTERS[filterKey]}
            </DropdownButton>
          </DropdownMenuItem>
        );
      })}
    </Dropdown>
  );
};

export default FilterDropdown;
