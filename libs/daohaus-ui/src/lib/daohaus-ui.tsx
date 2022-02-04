import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DaohausUiProps {}

const StyledDaohausUi = styled.div`
  color: pink;
`;

export function DaohausUi(props: DaohausUiProps) {
  return (
    <StyledDaohausUi>
      <h1>Welcome to DaohausUi!</h1>
    </StyledDaohausUi>
  );
}

export default DaohausUi;
