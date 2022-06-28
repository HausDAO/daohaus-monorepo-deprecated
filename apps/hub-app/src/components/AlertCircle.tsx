// COMPONENT LIBRARY

import { ParMd } from '@daohaus/ui';
import { blueDark } from '@radix-ui/colors';
import styled from 'styled-components';

// creat color variants

const AlertBox = styled.div`
  position: absolute;
  top: 0;
  right: -1.2rem;
  border-radius: 100px;
  height: 3.6rem;
  width: 3.6rem;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
  // REVIEW TEMPRORARY COLORS UNTIL WE MAKE CIRCLE SYSTEM
  // Why are we using regular blue here?
  // what role does blue play in our theme?
  background-color: ${blueDark.blue6};
  p {
    font-weight: 700;
  }
`;

type AlertCircleProps = {
  number: number;
};
export const AlertCircle = ({ number }: AlertCircleProps) => {
  return (
    <AlertBox>
      <ParMd>{number}</ParMd>
    </AlertBox>
  );
};
