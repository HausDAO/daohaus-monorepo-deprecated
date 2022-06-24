import React from 'react';
import classNames from 'classnames';
import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiCloseCircleFill,
} from 'react-icons/ri';

import { ParSm, Card, Link } from '../../atoms';
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
  success?: boolean;
  warning?: boolean;
  error?: boolean;
  iconType?: 'success' | 'warning' | 'error';
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

export const Toast = (props: ToastProps) => {
  const { title, description, iconType, success, warning, error, toastLinks } =
    props;
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
      <ToastRoot open={true} onOpenChange={setOpen} asChild>
        <Card success={success} warning={warning} error={error}>
          <ToastHeaderContainer>
            {getEnumIcons(iconType || 'success')}
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

// If Toast contains links
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

// Creating enum object of Icons
const EnumIconsObject = {
  success: <RiCheckboxCircleFill />,
  warning: <RiErrorWarningFill />,
  error: <RiCloseCircleFill />,
};

function getEnumIcons(state: 'success' | 'warning' | 'error') {
  return <ToastIcon toastType={state}>{EnumIconsObject[state]}</ToastIcon>;
}
