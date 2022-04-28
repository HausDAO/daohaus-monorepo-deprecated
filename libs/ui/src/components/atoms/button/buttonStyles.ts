import styled from 'styled-components';
import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';

export const ButtonBase = styled.button`
  background-color: ${({ theme }: { theme: Theme }) => theme.button.primary.bg};
  border: 0.1rem solid
    ${({ theme }: { theme: Theme }) => theme.button.primary.border};
  color: ${({ theme }: { theme: Theme }) => theme.button.primary.text};
  min-width: 8.5rem;
  height: 4.8rem;
  font-size: ${font.size.md};
  font-weight: ${font.weight.bold};
  letter-spacing: 1.8px;
  border-radius: 0.4rem;
  padding: 1.2rem;
  cursor: pointer;
  transition: 0.2s all;
  :hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.primary.hoverBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.primary.hoverBorder};
    color: ${({ theme }: { theme: Theme }) => theme.button.primary.hoverText};
  }
  :focus {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.primary.focusBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.primary.focusBorder};
    color: ${({ theme }: { theme: Theme }) => theme.button.primary.focusText};
  }
  :active {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.primary.activeBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.primary.activeBorder};
    color: ${({ theme }: { theme: Theme }) => theme.button.primary.activeText};
  }
  :disabled {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.primary.disabledBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.primary.disabledBorder};
    color: ${({ theme }: { theme: Theme }) =>
      theme.button.primary.disabledText};
    cursor: not-allowed;
  }

  &.secondary {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.secondary.bg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.secondary.border};
    color: ${({ theme }: { theme: Theme }) => theme.button.secondary.text};
    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.hoverBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.secondary.hoverBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.hoverText};
    }
    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.focusBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.secondary.focusBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.focusText};
    }
    :active {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.activeBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.secondary.activeBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.activeText};
    }
    :disabled {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.disabledBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) =>
          theme.button.secondary.disabledBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.disabledText};
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
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.hoverBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.tertiary.hoverBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.hoverText};
    }
    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.focusBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.tertiary.focusBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.focusText};
    }
    :active {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.activeBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.tertiary.activeBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.activeText};
    }
    :disabled {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.disabledBg};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.tertiary.disabledBorder};
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.tertiary.disabledText};
      cursor: not-allowed;
    }
  }
  &.sm {
    min-width: 6.6rem;
    height: 3.6rem;
    padding: 0.9rem;
    font-size: ${font.size.xs};
  }
  &.lg {
    min-width: 10.7rem;
    height: 6rem;
    font-size: ${font.size.lg};
    padding: 1.5rem;
  }
  &.full-width {
    min-width: 100%;
  }
  &.left-align {
    text-align: left;
  }
`;
