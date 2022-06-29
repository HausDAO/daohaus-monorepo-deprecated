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
import { CustomToastProps, ToastLinksProps } from '../../../types/toastTypes';

export const Toast = (props: CustomToastProps) => {
  const {
    title,
    description,
    type,
    defaultOpen,
    open,
    onOpenChange,
    duration,
    label,
    swipeDirection,
    swipeThreshold,
    hotkey,
    success,
    warning,
    error,
    iconType,
    ariaLabelClose,
    toastLinks,
  } = props;

  return (
    <ToastProvider
      duration={duration}
      label={label}
      swipeDirection={swipeDirection}
      swipeThreshold={swipeThreshold}
    >
      <ToastRoot
        type={type}
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        asChild
      >
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
            <ToastClose asChild aria-label={ariaLabelClose || 'Close'}>
              <CloseIcon>
                <RiCloseFill aria-hidden />
              </CloseIcon>
            </ToastClose>
          </ToastHeaderContainer>
          {toastLinks && <ToastLinks {...toastLinks} />}
        </Card>
      </ToastRoot>
      <ToastViewport label={label} hotkey={hotkey} />
    </ToastProvider>
  );
};

// If Toast contains links
const ToastLinks = ({
  leftLink,
  rightLink,
  actionAltText,
}: ToastLinksProps) => {
  return (
    <ToastAction asChild altText={actionAltText || 'Related Link(s)'}>
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
