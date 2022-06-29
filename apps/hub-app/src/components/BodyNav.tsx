import React from 'react';
import { Link, useMatch, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { amberDark, indigoDark } from '@radix-ui/colors';
import { breakpoints, font } from '@daohaus/ui';

type StyledLinkProps = {
  selected?: boolean;
} & LinkProps;

type NavLinkProps = {
  children: React.ReactNode;
  path: string;
  selected?: boolean;
};

const LinkContainer = styled.div`
  padding: 1rem;
  border: 1px solid ${amberDark.amber5};
  border-radius: 0.8rem;
  background: ${indigoDark.indigo2};

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
const StyledLink = styled(Link)<StyledLinkProps>`
  text-decoration-color: ${amberDark.amber10};
  color: ${amberDark.amber9};
  text-underline-offset: 0.7rem;
  display: ${({ selected }) => (selected ? 'none' : 'flex')};
`;

const NavLink = ({ children, path, selected }: NavLinkProps) => {
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
  const match = useMatch('/explore');
  console.log('match');
  console.log(match);
  const isHome = !match;
  const isExplore = !!match;
  return (
    <BodyNavContainer>
      <NavLink path="/" selected={isHome}>
        Home
      </NavLink>
      <NavLink path="/explore" selected={isExplore}>
        Explore
      </NavLink>
    </BodyNavContainer>
  );
};
