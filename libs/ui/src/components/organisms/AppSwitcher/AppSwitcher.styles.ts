import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';

import { Button } from '../../atoms';
import { Theme } from '../../../types/theming';

export const AppSwitcherTrigger = styled(Button)`
  background-color: ${indigoDark.indigo3};
  color: white;
  border-radius: 0.4rem;
  border: none;
  min-width: 17.8rem;

  :hover {
    background-color: ${indigoDark.indigo5};
    color: white;
    border: none;
  }

  :focus {
    background-color: ${indigoDark.indigo5};
    color: white;
    border: none;
  }

  :active {
    background-color: ${indigoDark.indigo5};
    color: white;
    border: none;
  }

  :disabled {
    background-color: ${indigoDark.indigo1};
    color: white;
    border: none;
  }
`;
