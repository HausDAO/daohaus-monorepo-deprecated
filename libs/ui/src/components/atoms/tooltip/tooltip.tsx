import {
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from './styles';
import { SmTooltipTrigger } from './tooltipTriggers';
import { TooltipProps } from './types';

const Tooltip = ({
  content = 'Content goes here',
  side = 'right',
  triggerEl = <SmTooltipTrigger />,
  offset = 18,
  delay = 400,
}: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <TooltipRoot>
        <TooltipTrigger>{triggerEl}</TooltipTrigger>
        <TooltipContent side={side} sideOffset={offset}>
          {content}
          <TooltipArrow />
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export default Tooltip;
