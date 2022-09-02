import { MouseEvent, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  SingleColumnLayout,
} from '@daohaus/ui';
import { statusFilter } from '@daohaus/dao-data';
import { BsPlusLg } from 'react-icons/bs';

import { defaultDaoData, useDao, useProposals } from '../contexts/DaoContext';
import { NewProposalList } from '../components/NewProposalList';
import { PROPOSAL_FORMS } from '../legos/form';
import SearchInput from '../components/SearchInput';
import FilterDropdown from '../components/FilterDropdown';
import { BaseProposalCard } from '../components/proposalCards/BaseProposalCard';
import { PROPOSAL_STATUS } from '@daohaus/common-utilities';

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

export const VALID_NEW_PROPOSALS = [
  PROPOSAL_FORMS.SIGNAL,
  PROPOSAL_FORMS.SHARE_SWAP,
];

export function Proposals() {
  const {
    proposals,
    setProposalsPaging,
    proposalsNextPaging,
    setProposalsFilter,
    setProposals,
  } = useProposals();
  const { dao, refreshAll } = useDao();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const newProposals = useMemo(() => {
    return Object.keys(PROPOSAL_FORMS).map((key) => PROPOSAL_FORMS[key]);
  }, []);

  const handleSearchFilter = (term: string) => {
    setSearchTerm(term);
    const filterQuery =
      filter !== ''
        ? statusFilter(
            PROPOSAL_STATUS[filter],
            Number(dao?.votingPeriod) + Number(dao?.gracePeriod)
          )
        : undefined;

    if (searchTerm && searchTerm.length > 0) {
      setProposals(undefined);
      setProposalsFilter({
        ...filterQuery,
        title_contains_nocase: searchTerm,
      });
      setProposalsPaging(defaultDaoData.proposalsPaging);
    } else {
      setProposals(undefined);
      setProposalsFilter(filterQuery);
      setProposalsPaging(defaultDaoData.proposalsPaging);
    }
  };

  const toggleFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const searchQuery =
      searchTerm !== '' ? { title_contains_nocase: searchTerm } : undefined;
    setFilter((prevState) => {
      if (prevState === event.currentTarget.value) {
        setProposalsFilter(searchQuery);
        setProposalsPaging(defaultDaoData.proposalsPaging);
        setProposals(undefined);
        return '';
      } else {
        const votingPlusGraceDuration =
          Number(dao?.votingPeriod) + Number(dao?.gracePeriod);
        const filterQuery = statusFilter(
          PROPOSAL_STATUS[event.currentTarget.value],
          votingPlusGraceDuration
        );
        setProposalsFilter({ ...filterQuery, ...searchQuery });
        setProposalsPaging(defaultDaoData.proposalsPaging);
        setProposals(undefined);
        return event.currentTarget.value;
      }
    });
  };

  const handleLoadMore = (event: MouseEvent<HTMLButtonElement>) => {
    setProposalsPaging(proposalsNextPaging);
  };

  return (
    <SingleColumnLayout title="Proposals">
      <Button onClick={refreshAll}>fresh</Button>
      <ActionsContainer>
        <SearchFilterContainer>
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={handleSearchFilter}
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
        proposals.map((proposal) => (
          <BaseProposalCard proposal={proposal} key={proposal.id} />
        ))}

      {proposalsNextPaging !== undefined && (
        <Button tertiary sm onClick={handleLoadMore}>
          Show More Proposals
        </Button>
      )}
    </SingleColumnLayout>
  );
}

export default Proposals;
