import styled from 'styled-components';

import { font } from '../../../theme/global/font';

export const ButtonBase = styled.button<{
  colorVariant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
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
  padding: 1.2rem;
  transition: 0.2s all;

  &.solid {
    background-color: ${({ theme, colorVariant }) =>
      theme.button[`${colorVariant}`].bg};
    border: 0.1rem solid
      ${({ theme, colorVariant }) => theme.button[`${colorVariant}`].border};
    color: ${({ theme, colorVariant }) => theme.button[`${colorVariant}`].text};

    :hover {
      background-color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].hoverBg};
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].hoverBorder};
    }

    :focus {
      background-color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].focusBg};
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].focusBorder};
    }

    :disabled {
      background-color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].disabledBg};
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].disabledBorder};
      cursor: not-allowed;
    }
  }

  &.outline {
    background-color: transparent;
    border: 0.1rem solid
      ${({ theme, colorVariant }) => theme.button[`${colorVariant}`].outline};
    color: ${({ theme, colorVariant }) =>
      theme.button[`${colorVariant}`].outline};

    :hover {
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].outlineHover};
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outlineHover};
    }

    :focus {
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].outlineFocus};
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outlineFocus};
    }

    :disabled {
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].outlineDisabled};
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outlineDisabled};
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
    color: ${({ theme, colorVariant }) =>
      theme.button[`${colorVariant}`].outline};

    :hover {
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outlineHover};
      text-decoration: underline;
    }

    :focus {
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outlineFocus};
    }

    :disabled {
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outlineDisabled};
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

  &.full-width {
    min-width: 100%;
  }

  svg {
    width: 2.2rem;
    height: 2.2rem;

    &.icon-left {
      margin-right: 1rem;
    }

    &.icon-right {
      margin-left: 0.5rem;
    }
  }
`;
