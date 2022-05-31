import React from 'react';
import styled from 'styled-components';
import { H1 } from '@daohaus/ui';
import { ConnectButton } from '@daohaus/daohaus-connect-feature';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const HomeLink = styled(Link)`
  color: unset;
  text-decoration: unset;
`;

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <BrandContainer>
          <HomeLink to="/">
            <H1>daohaus v3 sandbox</H1>
          </HomeLink>
        </BrandContainer>
        <ConnectButton />
      </HeaderContainer>
      <Breadcrumb />
    </>
  );
};

export default Header;
