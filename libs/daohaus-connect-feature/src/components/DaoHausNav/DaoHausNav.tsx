import styled from 'styled-components';
import { ConnectButton } from '../ConnectButton';
import { NetworkButton } from '../NetworkButton';

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  .connect-box {
    margin-left: 1.2rem;
  }
`;

export const DaoHausNav = () => {
  return (
    <StyledNav>
      <div>
        <NetworkButton />
      </div>
      <div className="connect-box">
        <ConnectButton />
      </div>
    </StyledNav>
  );
};
