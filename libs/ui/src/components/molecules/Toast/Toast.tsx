import React from 'react';
import {
  RiCloseFill,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
} from 'react-icons/ri';

import { Icon, ParSm } from '../../atoms';
import {
  ToastProvider,
  ToastViewport,
  ToastHeaderContainer,
  ToastCopyContainer,
  ToastRoot,
  ToastIcon,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  CloseIcon,
} from './Toast.styles';

export type ToastProps = {
  title: string;
  description?: string;
  duration?: number;
  providerLabel: string;
  isError?: string | React.ReactNode;
  children?: React.ReactNode;
};

export const Toast = ({
  title = 'Title goes here',
  description = 'Description Goes here and has more detail/text than the title',
}: ToastProps) => {
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function oneWeekAway() {
    const now = new Date();
    const inOneWeek = now.setDate(now.getDate() + 7);
    return new Date(inOneWeek);
  }

  return (
    <ToastProvider swipeDirection="right">
      <button
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            eventDateRef.current = oneWeekAway();
            setOpen(true);
          }, 100);
        }}
      >
        Add to calendar
      </button>
      <ToastRoot open={open} onOpenChange={setOpen}>
        <ToastHeaderContainer>
          <ToastIcon>
            <RiCheckboxCircleFill />
          </ToastIcon>
          <ToastCopyContainer>
            <ToastTitle asChild>
              <ParSm>{title}</ParSm>
            </ToastTitle>
            {description && (
              <ToastDescription asChild>
                <ParSm>{description}</ParSm>
              </ToastDescription>
            )}
          </ToastCopyContainer>
          <ToastClose asChild aria-label="Close">
            <CloseIcon>
              <RiCloseFill aria-hidden />
            </CloseIcon>
          </ToastClose>
        </ToastHeaderContainer>
        <ToastAction asChild altText="Goto schedule to undo">
          <div>
            <button>left</button>
            <button>Right</button>
          </div>
        </ToastAction>
      </ToastRoot>
      <ToastViewport />
    </ToastProvider>
  );
};
