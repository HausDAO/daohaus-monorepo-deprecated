import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';
import { field } from '../../../theme/component/fieldFamily';

export const InputSelectBox = styled.div`
  display: flex;
  width: 100%;
  max-width: ${field.size.md};

  .select {
    max-width: 10rem;
    padding: 0 0.8rem;
    border-radius: 0 ${field.borderRadius} ${field.borderRadius} 0;
    border-left: none;
    color: white;
    font-weight: ${font.weight.bold};
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.button.secondary.bg};
    color: ${({ theme }: { theme: Theme }) => theme.button.secondary.text};

    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.hoverBg};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.focusBg};
    }

    :disabled {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.disabledBg};
      cursor: not-allowed;
    }
  }

  .select-box {
    max-width: 10rem;
    svg {
      right: 0.6rem;
      color: ${({ theme }: { theme: Theme }) =>
        theme.button.secondary.disabledText};
    }
  }

  .input {
    border-right: none;
    border-radius: ${field.borderRadius} 0 0 ${field.borderRadius};
  }

  &.long {
    max-width: ${field.size.lg};
  }

  &.full {
    max-width: ${field.size.full};
  }
`;
