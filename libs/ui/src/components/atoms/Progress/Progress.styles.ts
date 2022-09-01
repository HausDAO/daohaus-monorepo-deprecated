import styled from 'styled-components';

export const ProgressVisualFull = styled.div`
  background-color: ${({ backgroundColor }: { backgroundColor: string }) =>
    backgroundColor};
  display: flex;
  height: 10px;
  margin: 20px 0;
`;

export const ProgressVisualPart = styled.div<{
  width: string;
  backgroundColor: string;
}>`
  width: ${(props) => props.width};
  background-color: ${({ backgroundColor }) => backgroundColor};
  /* Number of the seconds for complete animation */
  transition: width 2s;
`;
