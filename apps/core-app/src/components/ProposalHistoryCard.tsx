import { useParams } from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import styled from 'styled-components';

import {
  ParXl,
  Bold,
  Theme,
  ParMd,
  AddressDisplay,
  DataIndicator,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  ParLg,
} from '@daohaus/ui';
import { Keychain } from '@daohaus/common-utilities';
import { ExplorerLink } from '@daohaus/daohaus-connect-feature';

import {
  ProposalHistoryElement,
  ProposalHistoryElementData,
} from '../utils/historyHelpers';
import { TProposals } from '../contexts/DaoContext';
import { VoteList } from './VoteList';

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 0;
  border-bottom: 1px solid #ffffff16;
`;

const VisibleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

const StyledTitle = styled(Bold)`
  color: ${({ theme, active }: { theme: Theme; active: boolean }) =>
    active && theme.link.color};
`;

const StyledUpArrow = styled(RiArrowUpSLine)`
  font-size: 4.8rem;
  font-weight: 900;
  color: ${({ theme }: { theme: Theme }) => theme.link.color};
`;

const StyledDownArrow = styled(RiArrowDownSLine)`
  font-size: 4.8rem;
  font-weight: 900;
  color: ${({ theme }: { theme: Theme }) => theme.link.color};
`;

const DataGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2.4rem;
`;

const SpacedAddressDisplay = styled(AddressDisplay)`
  margin-top: 1rem;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2.5rem;
`;

const DataPoint = ({
  data,
  daochain,
}: {
  data: ProposalHistoryElementData;
  daochain?: string;
}) => {
  if (data.dataType === 'member') {
    return (
      <div>
        <ParMd>{data.label}</ParMd>
        <SpacedAddressDisplay
          truncate
          address={data.data}
          copy
          explorerNetworkId={daochain as keyof Keychain}
        />
      </div>
    );
  }

  if (data.dataType === 'dataIndicator') {
    return <DataIndicator label={data.label} data={data.data} />;
  }

  return null;
};

type ProposalHistoryCardProps = {
  element: ProposalHistoryElement;
  proposal?: TProposals[number];
};

export const ProposalHistoryCard = ({
  element,
  proposal,
}: ProposalHistoryCardProps) => {
  const { daochain } = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = (event: MouseEvent<HTMLDivElement>) => {
    setOpen((prevState) => !prevState);
  };

  const hasProposalVotes =
    proposal && proposal.votes && proposal.votes.length > 0;

  return (
    <ElementContainer>
      <VisibleContainer>
        <ContentContainer>
          <ParLg>
            <StyledTitle active={element.active}>{element.title}</StyledTitle>
          </ParLg>
          {element.text && <ParMd>{element.text}</ParMd>}
        </ContentContainer>
        {element.canExpand && open && (
          <div onClick={handleToggle}>
            <StyledUpArrow />
          </div>
        )}
        {element.canExpand && !open && (
          <div onClick={handleToggle}>
            <StyledDownArrow />
          </div>
        )}
        {element.showVotesButton && hasProposalVotes && (
          <Dialog>
            <DialogTrigger asChild>
              <Button sm secondary>
                Show Votes (
                {Number(proposal.yesVotes) + Number(proposal.noVotes)})
              </Button>
            </DialogTrigger>
            <DialogContent title={`Proposal Votes (${proposal.votes?.length})`}>
              <VoteList votes={proposal.votes} proposal={proposal} />
            </DialogContent>
          </Dialog>
        )}
      </VisibleContainer>
      {element.canExpand && open && (
        <>
          <DataGrid>
            {element.dataElements &&
              element.dataElements.map((data) => (
                <DataPoint data={data} daochain={daochain} key={data.label} />
              ))}
          </DataGrid>

          {element.txHash && (
            <LinkContainer>
              <ExplorerLink address={element.txHash} type="tx">
                View Transaction
              </ExplorerLink>
            </LinkContainer>
          )}
        </>
      )}
    </ElementContainer>
  );
};
