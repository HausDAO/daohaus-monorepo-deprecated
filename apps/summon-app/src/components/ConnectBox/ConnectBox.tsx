import styled from 'styled-components';

import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { border, Button, ParSm, Theme } from '@daohaus/ui';

const ConnectBoxContainer = styled.div`
  border-radius: ${border.radius};
  border: 1px ${({ theme }: { theme: Theme }) => theme.error} solid;
  padding: 1.5rem;
  margin-bottom: 2rem;
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin-right: auto;
    }
  }
`;

export const ConnectBox = () => {
  const { connectWallet } = useHausConnect();
  return (
    <ConnectBoxContainer>
      <div className="inner">
        <ParSm>Connect wallet to a DAO</ParSm>
        <Button onClick={connectWallet} sm type="button">
          Connect
        </Button>
      </div>
    </ConnectBoxContainer>
  );
};
