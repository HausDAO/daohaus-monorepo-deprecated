import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { amberDark } from '@radix-ui/colors';
import { breakpoints, font } from '@daohaus/ui';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';

const LinkContainer = styled.div`
  padding: 1rem;
  border: 1px solid ${amberDark.amber9};
  border-radius: 0.8rem;
  background: ${amberDark.amber3};

  @media (min-width: ${breakpoints.xs}) {
    border: none;
    font-size: ${font.size.xl};
    background: none;
  }
`;

const BodyNavContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (min-width: ${breakpoints.xs}) {
    align-items: center;
    justify-content: flex-start;
  }
`;

// Add selected
const StyledLink = styled(Link)`
  text-decoration-color: ${amberDark.amber10};
  color: ${amberDark.amber9};
  text-underline-offset: 0.7rem;
`;

type NavLinkProps = {
  children: React.ReactNode;
  path: string;
};

const NavLink = ({ children, path }: NavLinkProps) => {
  const selected = path;
  return (
    <StyledLink
      to={{
        pathname: path,
      }}
      selected={selected}
    >
      <LinkContainer>{children}</LinkContainer>
    </StyledLink>
  );
};

export const BodyNav = () => {
  const { isConnected } = useHausConnect();
  return (
    <BodyNavContainer>
      <NavLink path="/">Home</NavLink>
      <NavLink path="/explore">Explore DAOs</NavLink>
    </BodyNavContainer>
  );
};
