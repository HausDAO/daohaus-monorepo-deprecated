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
  // const isSm = useBreakpoint(widthQuery.sm);
  return (
    <StyledNav className="connect">
      <div>
        <NetworkButton isSm={false} />
      </div>
      <div className="connect-box">
        <ConnectButton isSm={false} />
      </div>
    </StyledNav>
  );
};
