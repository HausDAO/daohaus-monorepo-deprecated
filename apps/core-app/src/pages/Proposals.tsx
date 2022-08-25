import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  SingleColumnLayout,
} from '@daohaus/ui';
import { BsPlusLg } from 'react-icons/bs';

import { useProposals } from '../contexts/DaoContext';
import { NewProposalList } from '../components/NewProposalList';
import { FORM } from '../legos/form';
import SearchInput from '../components/SearchInput';
import FilterDropdown from '../components/FilterDropdown';
import { BaseProposalCard } from '../components/BaseProposalCard';

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  gap: 2.1rem;
`;

export const VALID_NEW_PROPOSALS = [FORM.SIGNAL, FORM.SHARE_SWAP];

export function Proposals() {
  const { proposals } = useProposals();
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [filter, setFilter] = useState<string | ''>('');

  const newProposals = useMemo(() => {
    return Object.keys(FORM).map((key) => FORM[key]);
  }, []);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm((prevState) =>
      prevState === event.target.value ? '' : event.target.value
    );
  };

  const toggleFilter = (event: MouseEvent<HTMLButtonElement>) => {
    setFilter((prevState) =>
      prevState === event.currentTarget.value ? '' : event.currentTarget.value
    );
  };

  return (
    <SingleColumnLayout title="Proposals">
      <ActionsContainer>
        <SearchFilterContainer>
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={handleSearchTermChange}
            totalItems={proposals?.length || 0}
          />

          <FilterDropdown filter={filter} toggleFilter={toggleFilter} />
        </SearchFilterContainer>
        <Dialog>
          <DialogTrigger asChild>
            <Button IconLeft={BsPlusLg}>New Proposal</Button>
          </DialogTrigger>
          <DialogContent title="Choose Proposal Type">
            <NewProposalList proposalLegos={newProposals} />
          </DialogContent>
        </Dialog>
      </ActionsContainer>
      {proposals &&
        proposals.map((proposal) => <BaseProposalCard proposal={proposal} />)}
    </SingleColumnLayout>
  );
}

export default Proposals;
