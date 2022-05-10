import {
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from './tooltipStyles';
import { SmTooltipIcon } from './tooltipTriggers';

export type TooltipProps = {
  content?: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  triggerEl?: React.ReactNode;
  offset?: number;
  delay?: number;
};

export const Tooltip = ({
  content = 'Content goes here',
  side = 'right',
  triggerEl = <SmTooltipIcon />,
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
