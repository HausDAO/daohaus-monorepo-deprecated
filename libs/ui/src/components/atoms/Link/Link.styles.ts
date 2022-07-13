import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Theme } from 'libs/ui/src/types';
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
`;

export const ExternalLink = styled.a`
  ${LinkStyles}

  svg {
    height: 2rem;
    padding-left: 0.24rem;
    width: 2rem;
  }
`;

export const InternalLink = styled(Link)`
  ${LinkStyles}
`;
