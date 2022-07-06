import { MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';

import { Button, Dropdown, Theme } from '@daohaus/ui';
import { ParMd } from '@daohaus/ui';
import { SORT_FIELDS } from '../utils/constants';
import { BiChevronDown } from 'react-icons/bi';

const DropdownButton = styled(Button)`
  &.selected {
    background-color: ${(props: { theme: Theme }) => props.theme.secondary};
  }
`;

type FilterDropdownProps = {
  sortBy: string;
  toggleSortBy: (event: MouseEvent<HTMLButtonElement>) => void;
};

const SortDropdown = ({ sortBy, toggleSortBy }: FilterDropdownProps) => {
  const theme = useTheme();

  return (
    <>
      <ParMd>Sorted by</ParMd>
      <Dropdown
        align="end"
        width="25rem"
        bg={theme.button.secondary.bg}
        trigger={
          <Button secondary IconRight={BiChevronDown}>
            {SORT_FIELDS[sortBy].name}
          </Button>
        }
        items={Object.keys(SORT_FIELDS).map((key) => {
          return {
            type: 'clickable',
            content: (
              <DropdownButton
                secondary
                fullWidth
                leftAlign
                value={key}
                onClick={toggleSortBy}
                IconRight={sortBy === key ? AiOutlineCheck : undefined}
                className={sortBy === key ? 'selected' : ''}
              >
                <div style={{ width: '100%' }}>{SORT_FIELDS[key].name}</div>
              </DropdownButton>
            ),
          };
        })}
      />
    </>
  );
};

export default SortDropdown;
