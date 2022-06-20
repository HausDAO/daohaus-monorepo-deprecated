import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { crimsonDark, crimsonDarkA } from '@radix-ui/colors';
import { widthBreakpoint, font } from '@daohaus/ui';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';

const LinkContainer = styled.div`
  padding: 1rem;
  border: 1px solid ${crimsonDark.crimson5};
  border-radius: 0.8rem;
  background: ${crimsonDarkA.crimsonA3};

  @media (min-width: ${widthBreakpoint.mobileLg}px) {
    border: none;
    font-size: ${font.size.xl};
    background: none;
  }
`;

const BodyNavContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (min-width: ${widthBreakpoint.mobileLg}px) {
    align-items: center;
    justify-content: center;
  }
`;
const StyledLink = styled(Link)`
  text-decoration-color: ${crimsonDark.crimson11};
  color: ${crimsonDark.crimson12};
  text-underline-offset: 0.7rem;
`;
type NavLinkProps = {
  children: React.ReactNode;
  path: string;
};

const NavLink = ({ children, path }: NavLinkProps) => {
  return (
    <StyledLink
      to={{
        pathname: path,
      }}
    >
      <LinkContainer>{children}</LinkContainer>
    </StyledLink>
  );
};

export const BodyNav = () => {
  const { isConnected } = useHausConnect();
  return (
    <BodyNavContainer>
      <NavLink path="/explore">Explore</NavLink>
      {!isConnected && <NavLink path="/dashboard">Dashboard</NavLink>}
    </BodyNavContainer>
  );
};
