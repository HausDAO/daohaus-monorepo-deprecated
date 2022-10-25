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

  &.solid {
    background-color: ${({ theme, colorVariant }) =>
      theme.button[`${colorVariant}`].solid.bg};
    border: 0.1rem solid
      ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].solid.border};
    color: ${({ theme, colorVariant }) =>
      theme.button[`${colorVariant}`].solid.text};

    :hover {
      background-color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].solid.bgHover};
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].solid.borderHover};
    }

    :focus {
      background-color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].solid.bgFocus};
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].solid.borderFocus};
    }

    :disabled {
      background-color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].solid.bgDisabled};
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].solid.borderDisabled};
      cursor: not-allowed;
    }
  }

  &.outline {
    background-color: transparent;
    border: 0.1rem solid
      ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outline.border};
    color: ${({ theme, colorVariant }) =>
      theme.button[`${colorVariant}`].outline.text};

    :hover {
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].outline.hover};
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outline.hover};
    }

    :focus {
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].outline.focus};
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outline.focus};
    }

    :disabled {
      border: 0.1rem solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].outline.disabled};
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].outline.disabled};
      cursor: not-allowed;
    }
  }

  &.ghost {
    background-color: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.transparent};
    color: ${({ theme, colorVariant }) =>
      theme.button[`${colorVariant}`].ghost.text};

    :hover {
      background-color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].ghost.bgHover};
    }

    :focus {
      border: 1px solid
        ${({ theme, colorVariant }) =>
          theme.button[`${colorVariant}`].ghost.borderFocus};
    }

    :disabled {
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].ghost.disabled};
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
      theme.button[`${colorVariant}`].link.text};

    :hover {
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].link.hover};
      text-decoration: underline;
    }

    :focus {
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].link.focus};
    }

    :disabled {
      color: ${({ theme, colorVariant }) =>
        theme.button[`${colorVariant}`].link.disabled};
      cursor: not-allowed;
    }
  }

  &.sm {
    font-size: ${font.size.xs};
    height: 3.6rem;
    min-width: 6.6rem;
    padding: 0.9rem;

    svg {
      height: 1.8rem;
      width: 1.8rem;
    }
  }

  &.lg {
    font-size: ${font.size.lg};
    height: 6rem;
    min-width: 10.7rem;
    padding: 1.5rem;

    svg {
      height: 3.2rem;
      width: 3.2rem;
    }
  }

  &.full-width {
    min-width: 100%;
  }
`;
