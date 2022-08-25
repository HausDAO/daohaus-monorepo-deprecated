import styled from 'styled-components';

import { font } from '../../../theme/global/font';

export const ButtonBase = styled.button<{
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}>`
  align-items: center;
  border-radius: 0.4rem;
  cursor: pointer;
  display: flex;
  font-size: ${font.size.md};
  font-weight: ${font.weight.bold};
  height: 4.8rem;
  justify-content: left;
  letter-spacing: 1.8px;
  min-width: 8.5rem;
  padding: 1.2rem;
  transition: 0.2s all;

  &.solid {
    background-color: ${({ theme, color }) => theme.button[`${color}`].bg};
    border: 0.1rem solid
      ${({ theme, color }) => theme.button[`${color}`].border};
    color: ${({ theme, color }) => theme.button[`${color}`].text};

    :hover {
      background-color: ${({ theme, color }) =>
        theme.button[`${color}`].hoverBg};
      border: 0.1rem solid
        ${({ theme, color }) => theme.button[`${color}`].hoverBorder};
    }

    :focus {
      background-color: ${({ theme, color }) =>
        theme.button[`${color}`].focusBg};
      border: 0.1rem solid
        ${({ theme, color }) => theme.button[`${color}`].focusBorder};
    }

    :disabled {
      background-color: ${({ theme, color }) =>
        theme.button[`${color}`].disabledBg};
      border: 0.1rem solid
        ${({ theme, color }) => theme.button[`${color}`].disabledBorder};
      cursor: not-allowed;
    }
  }

  &.outline {
    background-color: transparent;
    border: 0.1rem solid
      ${({ theme, color }) => theme.button[`${color}`].border};
    color: ${({ theme, color }) => theme.button[`${color}`].border};

    :hover {
      border: 0.1rem solid
        ${({ theme, color }) => theme.button[`${color}`].hoverBorder};
      color: ${({ theme, color }) => theme.button[`${color}`].hoverBorder};
    }

    :focus {
      border: 0.1rem solid
        ${({ theme, color }) => theme.button[`${color}`].focusBorder};
      color: ${({ theme, color }) => theme.button[`${color}`].focusBorder};
    }

    :disabled {
      border: 0.1rem solid
        ${({ theme, color }) => theme.button[`${color}`].disabledBorder};
      color: ${({ theme, color }) => theme.button[`${color}`].disabledBorder};
      cursor: not-allowed;
    }
  }

  &.link {
    height: auto;
    font-family: ${font.family.body};
    font-weight: ${font.weight.reg};
    font-size: ${font.size.md};
    text-decoration: none;
    letter-spacing: 1.5px;
    padding: 0;
    background-color: transparent;
    border: none;
    color: ${({ theme, color }) => theme.button[`${color}`].border};

    :hover {
      color: ${({ theme, color }) => theme.button[`${color}`].hoverBorder};
    }

    :focus {
      color: ${({ theme, color }) => theme.button[`${color}`].focusBorder};
    }

    :disabled {
      color: ${({ theme, color }) => theme.button[`${color}`].disabledBorder};
      cursor: not-allowed;
    }
  }
`;
