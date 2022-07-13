import { MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';

import { Button, Dropdown, Theme } from '@daohaus/ui';
import { ParMd } from '@daohaus/ui';
import { SORT_FIELDS } from '../utils/constants';
import { BiChevronDown } from 'react-icons/bi';

const Container = styled.div`
  display: flex;
  align-items: center;
  right: 0;
  p {
    margin-right: 2.4rem;
  }
`;

const DropdownButton = styled(Button)`
  &.selected {
    background-color: ${(props: { theme: Theme }) => props.theme.secondary};
  }
`;

type SortDropdownProps = {
  sortBy: string;
  toggleSortBy: (event: MouseEvent<HTMLButtonElement>) => void;
};

const SortDropdown = ({ sortBy, toggleSortBy }: SortDropdownProps) => {
  const theme = useTheme();

  return (
    <Container>
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
    </Container>
  );
};

export default SortDropdown;
