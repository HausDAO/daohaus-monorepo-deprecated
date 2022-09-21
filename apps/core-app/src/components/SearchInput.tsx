import { ChangeEvent, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Input } from '@daohaus/ui';
import useDebounce from '../utils/debounceHook';

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
    <Input
      icon={BiSearch}
      full
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
