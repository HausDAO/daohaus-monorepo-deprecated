import { useState } from 'react';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from './Tooltip.styles';
import { SmTooltipIcon } from './TooltipTriggers';

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
  const [open, setOpen] = useState(false);
  const [stayOpen, setStayOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setStayOpen(true);
  };

  const handleClickOutside = () => {
    setOpen(false);
    setStayOpen(false);
  };

  return (
    <TooltipProvider skipDelayDuration={delay} delayDuration={delay}>
      <TooltipRoot
        open={open || stayOpen}
        onOpenChange={setOpen}
        delayDuration={delay}
      >
        <TooltipTrigger onClick={handleClickOpen}>{triggerEl}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side={side}
            sideOffset={offset}
            onEscapeKeyDown={() => setOpen(false)}
            onPointerDownOutside={handleClickOutside}
          >
            {content}
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
};
