import { font } from '../../../theme/global/font';
import styled from 'styled-components';

export const TemporaryLink = styled.a`
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-family: ${font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};
  color: ${(props) => props.theme.button.primary.bg};

  :hover {
    text-decoration: underline;
    color: ${(props) => props.theme.button.primary.hoverBg};
  }
`;
