import React, { FunctionComponent } from 'react';

import { BiErrorCircle } from 'react-icons/bi';
import {
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from './styles';

type TooltipType = FunctionComponent<{
  content?: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  triggerEl?: React.ReactNode;
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
          <TooltipArrow />
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export default Tooltip;
