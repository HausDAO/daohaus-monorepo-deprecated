import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';

const LinkStyles = css`
  align-items: center;
  color: ${({ theme }: { theme: Theme }) => theme.link.color};
  cursor: pointer;
  display: inline-flex;
  font-family: ${font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  svg {
    margin-left: 0.3rem;
  }
`;

export const ExternalLink = styled.a`
  ${LinkStyles}
`;

export const InternalLink = styled(Link)`
  ${LinkStyles}
`;

export const NavLink = styled(Link)`
  ${LinkStyles};
  border-bottom: 2px transparent solid;
  color: ${(props) => props.theme.subNav.navLinkColor};
  cursor: pointer;
  font-size: 2.4rem;
  letter-spacing: 1.5px;
  padding-bottom: 1rem;
  transition: 0.2s all;

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    color: ${(props) => props.theme.subNav.navLinkHoverColor};
    text-decoration: none;
  }
  &.selected {
    color: white;
    border-bottom: 2px ${(props) => props.theme.subNav.navLinkColor} solid;
  }
  &.subnav {
    padding-bottom: 1rem;
  }
`;
