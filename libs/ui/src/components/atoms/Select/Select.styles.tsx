import { indigoDark } from '@radix-ui/colors';
import { field } from '../../../theme/component/fieldFamily';
import styled from 'styled-components';
import { Theme } from '../../../types/theming';

const themeStuff = {
  default: {
    bg: indigoDark.indigo3,
    text: indigoDark.indigo11,
    borderColor: 'transparent',
  },
};

export const WithIcon = styled.div`
  position: relative;
  width: 100%;
  max-width: ${field.size.md};
  svg {
    position: absolute;
    color: ${themeStuff.default.text};
    top: 1.4rem;
    right: 2rem;
  }
  &.input-select {
    max-width: 10rem;
    svg {
      right: 0.8rem;
    }
  }
  &.long {
    max-width: ${field.size.lg};
  }
  &.full {
    max-width: ${field.size.full};
  }
  &.warning {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning};
  }

  &.error {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.error};
  }
`;

export const BaseSelect = styled.select`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${themeStuff.default.bg};
  appearance: none;
  color: ${themeStuff.default.text};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  width: 100%;
  line-height: 150%;
  max-width: ${field.size.md};
  height: 4.8rem;
  padding: 0 1.8rem;
  border: 1px ${themeStuff.default.borderColor} solid;
  transition: ${field.transition};
  border-radius: ${field.borderRadius};

  &.long {
    max-width: ${field.size.lg};
  }
  &.full {
    max-width: ${field.size.full};
  }
  &.warning {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning};
  }

  &.error {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.error};
  }

  &.input-select {
    max-width: 10rem;
    padding: 0 1.2rem;
    border-radius: 0 ${field.borderRadius} ${field.borderRadius} 0;
  }
`;
export const StyledOption = styled.option`
  background-color: ${themeStuff.default.bg};
  color: ${themeStuff.default.text};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  height: 4.8rem;
`;
