import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';

export const ButtonBase = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.button.primary.bg};
  border: 0.1rem solid
    ${({ theme }: { theme: Theme }) => theme.button.primary.border};
  border-radius: 0.4rem;
  color: ${({ theme }: { theme: Theme }) => theme.button.primary.text};
  cursor: pointer;
  display: flex;
  font-size: ${font.size.md};
  font-weight: ${font.weight.bold};
  height: 4.8rem;
  justify-content: left;
  letter-spacing: 1.8px;
  padding: 1.2rem;
  transition: 0.2s all;
  width: ${(props: { width?: string }) => props.width};

  svg {
    width: 2.2rem;
    height: 2.2rem;
  }

  svg.icon-left {
    margin-right: 1rem;
  }

  svg.icon-right {
    margin-left: 0.5rem;
  }

  :hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.primary.hoverBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.primary.hoverBorder};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.primary.focusBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.primary.focusBorder};
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.primary.disabledBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.primary.disabledBorder};
    cursor: not-allowed;
  }

  &.secondary {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.secondary.bg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.secondary.bg};
    color: ${({ theme }: { theme: Theme }) => theme.button.secondary.text};

    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.hoverBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.secondary.hoverBorder};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.focusBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.secondary.focusBorder};
    }

    :disabled {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.disabledBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) =>
          theme.button.secondary.disabledBorder};
      cursor: not-allowed;
    }
  }

  &.tertiary {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.tertiary.bg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.tertiary.border};
    color: ${({ theme }: { theme: Theme }) => theme.button.tertiary.text};

    :hover {
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.tertiary.hoverBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.hoverText};
    }

    :focus {
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.tertiary.focusBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.focusText};
    }

    :disabled {
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.tertiary.disabledBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.disabledText};
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

  &.left-align {
    justify-content: flex-start;
  }
  &.center-align {
    justify-content: center;
  }

  &.avatar {
    padding: 0 0.6rem;
  }
`;
