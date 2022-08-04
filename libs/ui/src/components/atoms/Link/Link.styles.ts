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
