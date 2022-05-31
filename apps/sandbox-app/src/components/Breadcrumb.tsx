import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ParSm } from '@daohaus/ui';
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
  text-transform: uppercase;
`;

const Separator = styled.p`
  margin: 0 1rem 0 1rem;
  font-size: 2rem;
`;

const baseCrumb = { name: 'Home', path: '/' };

const getCrumbs = (path: string) => {
  if (path === '/') {
    return [baseCrumb];
  }

  const pathCrumbs = path.split('/');
  const daoCrumbs = [
    baseCrumb,
    { name: 'Dao', path: `/dao/${pathCrumbs[2]}/${pathCrumbs[3]}` },
  ];
  if (pathCrumbs.length > 4) {
    return [
      ...daoCrumbs,
      {
        name: pathCrumbs[4],
        path: `/dao/${pathCrumbs[2]}/${pathCrumbs[3]}/${pathCrumbs[4]}`,
      },
    ];
  }
  return daoCrumbs;
};

const Breadcrumb = () => {
  const location = useLocation();
  const [crumbs, setCrumbs] = useState([baseCrumb]);

  useEffect(() => {
    setCrumbs(getCrumbs(location.pathname));
  }, [location]);

  return (
    <NavContainer>
      {crumbs.map((crumb, i) => {
        return (
          <CrumbContainer key={crumb.name}>
            {i !== 0 && <Separator>|</Separator>}
            <CrumbLink to={crumb.path}>
              <ParSm>{crumb.name}</ParSm>
            </CrumbLink>
          </CrumbContainer>
        );
      })}
    </NavContainer>
  );
};

export default Breadcrumb;
