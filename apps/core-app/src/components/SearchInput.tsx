import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';
import { BiSearch } from 'react-icons/bi';
import { Input } from '@daohaus/ui';
import useDebounce from '../utils/debounceHook';

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
  setSearchTerm: (term: string) => void;
  totalItems: number;
};

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  totalItems,
}: SearchInputProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>('');

  const debouncedSearchTerm = useDebounce<string>(localSearchTerm, 700);

  useEffect(() => {
    if (localSearchTerm !== searchTerm) {
      setSearchTerm(localSearchTerm);
    }
    // TODO: I don't want to fire on these others!!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm((prevState) =>
      prevState === event.target.value ? '' : event.target.value
    );
  };

  return (
    <StyledInput
      icon={IconSearch}
      id="table-search"
      placeholder={`Search ${totalItems} ${
        totalItems === 1 ? 'Proposal' : 'Proposals'
      }`}
      onChange={handleSearchTermChange}
      defaultValue={localSearchTerm}
    />
  );
};

export default SearchInput;
