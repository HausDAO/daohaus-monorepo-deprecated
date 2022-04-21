import React, { FunctionComponent } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
// import { BiErrorCircle } from 'react-icons/bi';
import styled from 'styled-components';

import { font } from '../../../theme/global/font';
import { fadeIn } from '../../../animations/general';

type TooltipType = FunctionComponent<{
  content?: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  triggerEl?: string | React.ReactNode;
}>;

const Tooltip: TooltipType = ({
  content = 'Content goes here',
  side = 'right',
  triggerEl = <BiErrorCircle size="1.4rem" />,
}) => {
  return (
    <TooltipProvider delayDuration={400}>
      <TooltipRoot>
        <TooltipTrigger>{triggerEl}</TooltipTrigger>
        <TooltipContent side={side} sideOffset={18}>
          {content}
          {/* <StyledArrow /> */}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export default Tooltip;

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = styled(TooltipPrimitive.Trigger)`
  /* background-color: ${Color.BaseBg}; */
  border: none;
`;
export const TooltipContent = styled(TooltipPrimitive.Content)`
  /* background-color: ${Color.Bg[100]};
  border-radius: ${Border.Radius};
  padding: 1.2rem 1.5rem;
  font-size: ${font.size.md};
  line-height: 2.4rem;
  color: ${({theme}: {theme: Theme}) => };
  &[data-state='delayed-open'] {
    animation: ${fadeIn} 0.15s ease-in forwards;
  } */
`;
