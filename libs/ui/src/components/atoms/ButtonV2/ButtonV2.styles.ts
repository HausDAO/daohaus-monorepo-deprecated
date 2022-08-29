import styled from 'styled-components';

import { font } from '../../../theme/global/font';

export const ButtonBase = styled.button<{
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  buttonWidth: 'fit-content' | '100%' | string;
}>`
  align-items: center;
  border-radius: 0.4rem;
  cursor: pointer;
  display: flex;
  font-size: ${font.size.md};
  font-weight: ${font.weight.bold};
  height: 4.8rem;
  justify-content: center;
  letter-spacing: 1.8px;
  min-width: 8.5rem;
  padding: 1.2rem;
  transition: 0.2s all;
  width: ${(props: { buttonWidth?: string }) => props.buttonWidth};

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
      ${({ theme, color }) => theme.button[`${color}`].outline};
    color: ${({ theme, color }) => theme.button[`${color}`].outline};

    :hover {
      border: 0.1rem solid
        ${({ theme, color }) => theme.button[`${color}`].outlineHover};
      color: ${({ theme, color }) => theme.button[`${color}`].outlineHover};
    }

    :focus {
      border: 0.1rem solid
        ${({ theme, color }) => theme.button[`${color}`].outlineFocus};
      color: ${({ theme, color }) => theme.button[`${color}`].outlineFocus};
    }

    :disabled {
      border: 0.1rem solid
        ${({ theme, color }) => theme.button[`${color}`].outlineDisabled};
      color: ${({ theme, color }) => theme.button[`${color}`].outlineDisabled};
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
    color: ${({ theme, color }) => theme.button[`${color}`].outline};

    :hover {
      color: ${({ theme, color }) => theme.button[`${color}`].outlineHover};
      text-decoration: underline;
    }

    :focus {
      color: ${({ theme, color }) => theme.button[`${color}`].outlineFocus};
    }

    :disabled {
      color: ${({ theme, color }) => theme.button[`${color}`].outlineDisabled};
      cursor: not-allowed;
    }
  }

  &.sm {
    font-size: ${font.size.xs};
    height: 3.6rem;
    min-width: 6.6rem;
    padding: 0.9rem;
  }

  &.lg {
    font-size: ${font.size.lg};
    height: 6rem;
    min-width: 10.7rem;
    padding: 1.5rem;
  }

  svg {
    width: 2.2rem;
    height: 2.2rem;
    margin: 0 auto;

    &.icon-left {
      margin-right: 1rem;
    }

    &.icon-right {
      margin-left: 0.5rem;
    }
  }
`;
