import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H5 } from '@daohaus/ui';
import { Link, useLocation } from 'react-router-dom';

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: 1rem 0 1rem 0;
`;

const CrumbContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CrumbLink = styled(Link)`
  color: unset;
  text-decoration: unset;
`;

const Separator = styled.p`
  margin: 0 1rem 0 1rem;
  font-size: 2rem;
`;

const getPageName = (path: string): string => {
  if (path === '/') {
    return 'Home';
  }

  return '404';
};

const Breadcrumb = () => {
  const location = useLocation();
  const [pageName, setPageName] = useState('');
  const [crumbs, setCrumbs] = useState([
    { name: 'Home', path: '/' },
    { name: 'Dao', path: '/' },
  ]);

  useEffect(() => {
    setPageName(getPageName(location.pathname));
  }, [location]);

  return (
    <NavContainer>
      {crumbs.map((crumb, i) => {
        return (
          <CrumbContainer key={crumb.name}>
            {i !== 0 && <Separator>|</Separator>}
            <CrumbLink to={crumb.path}>
              <H5>{crumb.name}</H5>
            </CrumbLink>
          </CrumbContainer>
        );
      })}
    </NavContainer>
  );
};

export default Breadcrumb;
