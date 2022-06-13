import styled from 'styled-components';
import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';

export const ButtonBase = styled.button`
  background-color: ${({ theme }) => theme.button.primary.bg};
  border: 0.1rem solid
    ${({ theme }: { theme: Theme }) => theme.button.primary.bg};
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
      ${({ theme }: { theme: Theme }) => theme.button.primary.hoverBg};
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
      ${({ theme }: { theme: Theme }) => theme.button.primary.disabledBg};
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
        ${({ theme }: { theme: Theme }) => theme.button.secondary.hoverBg};
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
        ${({ theme }: { theme: Theme }) => theme.button.secondary.disabledBg};
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

  &.avatar {
    padding: 0 0.6rem;
  }
`;

export const WithIcon = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 2.1rem;
    height: 2.1rem;
    color: ${({ theme }: { theme: Theme }) => theme.button.primary.text};
    &.secondary {
      color: ${({ theme }: { theme: Theme }) => theme.button.secondary.text};
    }
    &.tertiary {
      color: ${({ theme }: { theme: Theme }) => theme.button.tertiary.text};
    }
    &.sm {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.8rem;
    }
  }
  svg.icon-left {
    margin-right: 1rem;
  }
  svg.icon-right {
    margin-left: 0.5rem;
  }
`;
