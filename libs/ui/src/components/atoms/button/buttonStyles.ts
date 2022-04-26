import styled from 'styled-components';
import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';

export const ButtonBase = styled.button`
  background-color: ${({ theme }: { theme: Theme }) => theme.button.primary};
  border: 0.1rem solid ${({ theme }: { theme: Theme }) => theme.button.primary};
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
      theme.button.primaryHover};
  }
  :focus {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.primaryFocus};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.primaryFocusBorder};
  }
  :active {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.primaryActive};
  }

  &.secondary {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.secondary};
    color: ${({ theme }: { theme: Theme }) => theme.button.secondaryText};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.button.secondary};
    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondaryHover};
    }
    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondaryFocus};
      border: 0.1rem solid
        ${({ theme }: { theme: Theme }) => theme.button.secondaryFocusBorder};
    }
    :active {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondaryActive};
    }
  }
  &.outline {
    background-color: transparent;
    color: ${({ theme }: { theme: Theme }) => theme.button.primary};
    :hover {
      color: ${({ theme }: { theme: Theme }) => theme.button.primaryHover};
      border: 1px solid
        ${({ theme }: { theme: Theme }) => theme.button.primaryHover};
    }
    :active {
      color: ${({ theme }: { theme: Theme }) => theme.button.primary};
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.button.primary};
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
  &.dropdown {
  }
  &.icon {
  }
`;
