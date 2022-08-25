import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  SingleColumnLayout,
} from '@daohaus/ui';
import { BsPlusLg } from 'react-icons/bs';

import { defaultDaoData, useDao, useProposals } from '../contexts/DaoContext';
import { NewProposalList } from '../components/NewProposalList';
import { FORM } from '../legos/form';
import SearchInput from '../components/SearchInput';
import FilterDropdown from '../components/FilterDropdown';
import { BaseProposalCard } from '../components/BaseProposalCard';
import useDebounce from '../utils/debounceHook';
import { statusFilter } from 'libs/dao-data/src/utils';
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

export const VALID_NEW_PROPOSALS = [FORM.SIGNAL, FORM.SHARE_SWAP];

export function Proposals() {
  const {
    proposals,
    setProposalsPaging,
    proposalsNextPaging,
    setProposalsFilter,
    setProposals,
  } = useProposals();
  const { dao } = useDao();
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [filter, setFilter] = useState<string | ''>('');

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);

  const newProposals = useMemo(() => {
    console.log('proposals', proposals);
    return Object.keys(FORM).map((key) => FORM[key]);
  }, [proposals]);

  // TODO: need both filters handled at the same time and triggered when one updates
  // filter: {details_contains_nocase: searchTerm, status_filter}

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm((prevState) => {
      if (prevState === event.target.value) {
        setProposalsFilter(undefined);
        setProposalsPaging(defaultDaoData.proposalsPaging);
        setProposals(undefined);
        return '';
      } else {
        setProposalsFilter({
          title_contains_nocase: event.target.value,
        });
        setProposalsPaging(defaultDaoData.proposalsPaging);
        setProposals(undefined);
        return event.target.value;
      }
    });
  };

  const toggleFilter = (event: MouseEvent<HTMLButtonElement>) => {
    setFilter((prevState) => {
      if (prevState === event.currentTarget.value) {
        setProposalsFilter(undefined);
        setProposalsPaging(defaultDaoData.proposalsPaging);
        setProposals(undefined);
        return '';
      } else {
        const votingPlusGraceDuration =
          Number(dao?.votingPeriod) + Number(dao?.gracePeriod);

        console.log('event.currentTarget.value', event.currentTarget.value);
        console.log(
          'SETTING: statusFilter(event.currentTarget.value, votingPlusGraceDuration)',
          statusFilter(
            PROPOSAL_STATUS[event.currentTarget.value],
            votingPlusGraceDuration
          )
        );
        setProposalsFilter(
          statusFilter(
            PROPOSAL_STATUS[event.currentTarget.value],
            votingPlusGraceDuration
          )
        );
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
