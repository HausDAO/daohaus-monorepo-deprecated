import styled from 'styled-components';
import { Card, ParXs } from '@daohaus/ui';
import { useMemo } from 'react';
import { PROPOSAL_TYPE_WARNINGS } from '../utils/constants';
import { ExplorerLink } from '@daohaus/daohaus-connect-feature';

const WarningContainer = styled(Card)`
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: flex-start; */
  width: 100%;
  /* gap: 1rem; */
`;

const Spacer = styled.div`
  margin-top: 2rem;
`;

type ProposalWarningProps = {
  proposalType: string | undefined;
  decodeError: boolean;
  txHash: string;
};

export const ProposalWarning = ({
  proposalType,
  decodeError,
  txHash,
}: ProposalWarningProps) => {
  const warningMessage: string = useMemo(() => {
    if (decodeError) {
      return PROPOSAL_TYPE_WARNINGS.ERROR_DECODE;
    } else {
      return (
        (proposalType && PROPOSAL_TYPE_WARNINGS[proposalType]) ||
        PROPOSAL_TYPE_WARNINGS.ERROR_UNKOWN
      );
    }
  }, [proposalType, decodeError]);
  return (
    <WarningContainer>
      <ParXs>{warningMessage}</ParXs>
      {decodeError ||
        (warningMessage === PROPOSAL_TYPE_WARNINGS.ERROR_UNKOWN && (
          <>
            <Spacer />
            <ExplorerLink address={txHash} type="tx">
              View Details
            </ExplorerLink>
          </>
        ))}
    </WarningContainer>
  );
};
