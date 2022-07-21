import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';
import { BiSearch } from 'react-icons/bi';
import { Input } from '@daohaus/ui';

const StyledInput = styled(Input)`
  background: ${indigoDark.indigo3};
  color: ${indigoDark.indigo11};
  margin-right: 2rem;
  ::placeholder {
    color: ${indigoDark.indigo11};
  }
  :focus {
    background: ${indigoDark.indigo3};
    color: ${indigoDark.indigo11};
  }
`;

const IconSearch = styled(BiSearch)`
  fill: ${indigoDark.indigo11};
  :hover {
    fill: ${indigoDark.indigo11};
  }
`;

type SearchInputProps = {
  searchTerm: string;
  setSearchTerm: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ searchTerm, setSearchTerm }: SearchInputProps) => {
  return (
    <StyledInput
      icon={IconSearch}
      id="table-search"
      placeholder="Search Daos"
      onChange={setSearchTerm}
      defaultValue={searchTerm}
    />
  );
};

export default SearchInput;
