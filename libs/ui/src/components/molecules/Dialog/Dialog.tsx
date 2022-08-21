import React, { RefObject } from 'react';
import { RiCloseFill } from 'react-icons/ri';

import { DialogProps } from '../../../types/dialog.types';
import { Button, H5 } from '../../atoms';
import {
  DialogRoot,
  DialogPrimitaveTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogPortal,
  StyledDialogContent,
  StyledDialogOverlay,
  HeaderContainer,
  DialogBody,
  ButtonContainer,
  CloseIcon,
} from './Dialog.styles';

type Ref =
  | ((instance: HTMLDivElement | null) => void)
  | RefObject<HTMLDivElement>
  | null
  | undefined;

export const Dialog = DialogRoot;
export const DialogTrigger = DialogPrimitaveTrigger;

export const DialogContent = React.forwardRef(
  (
    {
      title,
      children,
      description,
      alignButtons = 'end',
      leftButton,
      rightButton,
      ...props
    }: DialogProps,
    ref: Ref
  ) => {
    return (
      <DialogPortal>
        <StyledDialogOverlay />
        <StyledDialogContent {...props} ref={ref}>
          <div>
            <HeaderContainer>
              <DialogTitle asChild>
                <H5>{title}</H5>
              </DialogTitle>
              <DialogClose asChild>
                <CloseIcon>
                  <RiCloseFill aria-hidden />
                </CloseIcon>
              </DialogClose>
            </HeaderContainer>
            <DialogBody>
              <DialogDescription>{description}</DialogDescription>
            </DialogBody>
            {children}
          </div>
          {(leftButton || rightButton) && (
            <ButtonContainer align={alignButtons}>
              {leftButton && (
                <Button secondary sm {...leftButton}>
                  {leftButton?.children}
                </Button>
              )}
              {rightButton && (
                <Button secondary sm {...rightButton}>
                  {rightButton?.children}
                </Button>
              )}
            </ButtonContainer>
          )}
        </StyledDialogContent>
      </DialogPortal>
    );
  }
);
