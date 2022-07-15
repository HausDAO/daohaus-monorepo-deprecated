import React from 'react';
import styled from 'styled-components';

const BiColumnBox = styled.div`
  display: flex;
  flex-direction: row;
`;
type BiColumnLayoutProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export const BiColumnLayout = ({ left, right }: BiColumnLayoutProps) => {
  return (
    <BiColumnBox>
      <div className="left">{left}</div>
      <div>{right}</div>
    </BiColumnBox>
  );
};
