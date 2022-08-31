import styled from 'styled-components';
import { Card, ParXs, Theme } from '@daohaus/ui';
import { useMemo } from 'react';
import { PROPOSAL_TYPE_WARNINGS } from '../utils/constants';
import { ExplorerLink } from '@daohaus/daohaus-connect-feature';

const WarningContainer = styled(Card)`
  width: 100%;
  background-color: ${({ theme, error }: { theme: Theme; error: boolean }) =>
    error && theme.card.warningBg};
  border-color: ${({ theme, error }: { theme: Theme; error: boolean }) =>
    error && theme.card.warningBorder};
`;

const StyledParXs = styled(ParXs)`
  color: ${({ theme, error }: { theme: Theme; error: boolean }) =>
    error && theme.card.warningText};
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

  const hasError =
    decodeError || warningMessage === PROPOSAL_TYPE_WARNINGS.ERROR_UNKOWN;

  return (
    <WarningContainer error={hasError}>
      <StyledParXs error={hasError}>{warningMessage}</StyledParXs>
      {decodeError ||
        (hasError && (
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
