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

const LeftCard = styled(Card)`
  width: 100%;
  min-width: 54rem;
  max-width: 64rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Proposals() {
  const { proposals } = useProposals();

  return (
    <BiColumnLayout
      title="Proposals"
      actions={
        <Dialog>
          <DialogTrigger asChild>
            <Button IconLeft={BsPlusLg}>New Proposal</Button>
          </DialogTrigger>
          <DialogContent title="Choose Proposal Type">
            <NewProposalList />
          </DialogContent>
        </Dialog>
      }
      left={<LeftCard>{JSON.stringify(proposals, null, 2)}</LeftCard>}
      right={null}
    />
  );
}

export default Proposals;
