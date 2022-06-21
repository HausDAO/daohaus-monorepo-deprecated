import React from 'react';
import styled from 'styled-components';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
  Button,
  H5,
  H6,
  Underline,
  ParLg,
  ParMd,
  ParSm,
  Bold,
  Spinner,
} from '@daohaus/ui';
import { amberDark, crimsonDark, crimsonDarkA } from '@radix-ui/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 1.6rem;
  background: ${crimsonDarkA.crimsonA3};
  border: 1px solid ${crimsonDark.crimson5};
  border-radius: 0.8rem;
  max-height: 18rem;
`;

const ButtonContainer = styled.div`
  max-width: 12rem;
`;

const ConnectWalletButton = () => {
  const { connectWallet, isProfileLoading } = useHausConnect();
  return (
    <ButtonContainer>
      {!isProfileLoading ? (
        <Button fullWidth IconRight={FiMoreHorizontal} onClick={connectWallet}>
          Connect
        </Button>
      ) : (
        <Button disabled>
          <Spinner
            topColor={amberDark.amber8}
            bottomColor={amberDark.amber11}
            size="2.8rem"
            strokeWidth=".3rem"
          />
        </Button>
      )}
    </ButtonContainer>
  );
};

const ConnectCard = () => {
  return (
    <Container>
      <ParMd>
        <Bold>Connect Wallet to view Dashboard</Bold>
      </ParMd>
      <ParSm>
        View your DAOs, active proposals, and navigate to vote and interact
      </ParSm>
      <ConnectWalletButton />
    </Container>
  );
};

export default ConnectCard;
