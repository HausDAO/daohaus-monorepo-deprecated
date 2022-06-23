import React from 'react';
import {
  RiCloseFill,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
} from 'react-icons/ri';

import { Icon, ParSm, Card, Link } from '../../atoms';
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

type ToastProps = {
  title: string;
  description?: string;
  duration?: number;
  providerLabel?: string;
  isError?: boolean;
  isWarning?: boolean;
  actionAltText?: string;
  ariaLabelClose?: string;
  toastLinks?: ToastLinksProps;
};

type ToastLinksProps = {
  leftLink?: {
    path: string;
    text: string;
  };
  rightLink?: {
    path: string;
    text: string;
  };
};

export const Toast = ({
  title = 'Title goes here',
  description = 'Description Goes here and has more detail/text than the title',
  isError = false,
  isWarning = false,
  duration = 5000,
  providerLabel = 'Test Provider label',
  toastLinks = {
    leftLink: {
      path: 'www.coinbase.com',
      text: 'Coin Base',
    },
    rightLink: {
      path: 'www.opensea.io',
      text: 'Open Sea',
    },
  },
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
      <ToastRoot open={open} onOpenChange={setOpen} asChild>
        <Card>
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
          {toastLinks && <ToastLinks {...toastLinks} />}
        </Card>
      </ToastRoot>
      <ToastViewport />
    </ToastProvider>
  );
};

const ToastLinks = ({ leftLink, rightLink }: ToastLinksProps) => {
  return (
    <ToastAction asChild altText="Goto schedule to undo">
      <div>
        {leftLink && <Link href={leftLink.path}>{leftLink.text}</Link>}
        {rightLink && <Link href={rightLink.path}>{rightLink.text}</Link>}
      </div>
    </ToastAction>
  );
};
