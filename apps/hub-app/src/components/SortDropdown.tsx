import { ChangeEvent } from 'react';
import styled from 'styled-components';

import { Select } from '@daohaus/ui';
import { ParMd } from '@daohaus/ui';
import { SORT_FIELDS } from '../utils/constants';

const Container = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  width: 24rem;
  p {
    display: block;
    width: 12rem;
  }
`;

type SortDropdownProps = {
  sortBy: string;
  switchSortBy: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const SortDropdown = ({ sortBy, switchSortBy }: SortDropdownProps) => {
  return (
    <Container>
      <ParMd>Sort By</ParMd>
      <Select
        id="sort-select"
        value={sortBy}
        onChange={switchSortBy}
        options={Object.entries(SORT_FIELDS).map(([sortKey, sortValue]) => ({
          name: sortValue.name,
          value: sortKey,
        }))}
      />
    </Container>
  );
};

export default SortDropdown;
