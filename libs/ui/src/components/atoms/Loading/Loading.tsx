import styled from 'styled-components';

import {
  RiLoader4Line,
  RiLoader4Fill,
  RiLoader5Fill,
  RiLoader3Line,
} from 'react-icons/ri';

export const StyledLoader = styled(RiLoader5Fill)`
  height: 3rem;
  width: 3rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Loading = () => {
  return (
    <>
      <RiLoader3Line size="50" color="blue" fill="red" />
      <RiLoader4Line size="50" color="blue" fill="red" />
      <RiLoader4Fill size="50" color="blue" />
      <StyledLoader stroke="red" color="blue" fill="green" />
    </>
  );
};
