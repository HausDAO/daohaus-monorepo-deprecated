import styled from 'styled-components';
import {
  BiColumnLayout,
  Button,
  Card,
  widthQuery,
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@daohaus/ui';
import { BsPlusLg } from 'react-icons/bs';

import { useProposals } from '../contexts/DaoContext';
import { NewProposalList } from '../components/NewProposalList';
import { FORM } from '../legos/form';
import { useMemo } from 'react';

const LeftCard = styled(Card)`
  width: 100%;
  min-width: 54rem;
  max-width: 64rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const VALID_NEW_PROPOSALS = [FORM.SIGNAL, FORM.SHARE_SWAP];

export function Proposals() {
  const { proposals } = useProposals();

  const newProposals = useMemo(() => {
    return Object.keys(FORM).map((key) => FORM[key]);
  }, []);

  return (
    <BiColumnLayout
      title="Proposals"
      actions={
        <Dialog>
          <DialogTrigger asChild>
            <Button IconLeft={BsPlusLg}>New Proposal</Button>
          </DialogTrigger>
          <DialogContent title="Choose Proposal Type">
            <NewProposalList proposalLegos={newProposals} />
          </DialogContent>
        </Dialog>
      }
      left={<LeftCard>{JSON.stringify(proposals, null, 2)}</LeftCard>}
      right={null}
    />
  );
}

export default Proposals;
