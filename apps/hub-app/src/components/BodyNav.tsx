import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { crimsonDark, crimsonDarkA } from '@radix-ui/colors';
import { widthBreakpoint, font } from '@daohaus/ui';

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
  return (
    <BodyNavContainer>
      <NavLink path="/explore">Explore</NavLink>
      <NavLink path="/dashboard">Dashboard</NavLink>
    </BodyNavContainer>
  );
};
