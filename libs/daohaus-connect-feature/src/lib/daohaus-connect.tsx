import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DaohausConnectProps {}

const StyledDaohausConnect = styled.div`
  color: pink;
`;

export function DaohausConnect(props: DaohausConnectProps) {
  return (
    <StyledDaohausConnect>
      <h1>Welcome to DaohausConnect!</h1>
    </StyledDaohausConnect>
  );
}

export default DaohausConnect;
