import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styled from 'styled-components';

import { font } from '../../../theme/global/font';
import { fadeIn } from '../../../animations/general';
import { Theme } from '../../../types/theming';
import { border } from '../../../theme/global/border';

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = styled(TooltipPrimitive.Trigger)`
  background-color: ${({ theme }: { theme: Theme }) => theme.bgColor};
  svg {
    color: ${({ theme }: { theme: Theme }) => theme.warning};
  }
  border: none;
`;
export const TooltipArrow = styled(TooltipPrimitive.Arrow)`
  fill: ${({ theme }: { theme: Theme }) => theme.tooltip.bg};
`;
export const TooltipContent = styled(TooltipPrimitive.Content)`
  background-color: ${({ theme }: { theme: Theme }) => theme.tooltip.bg};
  border-radius: ${border.radius};
  padding: 1.2rem 1.5rem;
  font-size: ${font.size.md};
  line-height: 2.4rem;
  color: ${({ theme }: { theme: Theme }) => theme.fontColor};
  &[data-state='delayed-open'] {
    animation: ${fadeIn} 0.15s ease-in forwards;
  }
`;
