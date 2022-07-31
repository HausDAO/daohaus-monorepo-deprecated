import React, { RefObject } from 'react';
import { DialogContentProps } from '@radix-ui/react-dialog';
import { RiCloseFill } from 'react-icons/ri';

import { Button, ButtonProps, H5 } from '../../atoms';
import {
  ModalRoot,
  ModalPrimitaveTrigger,
  ModalTitle,
  ModalDescription,
  ModalClose,
  ModalPortal,
  StyledModalContent,
  StyledModalOverlay,
  HeaderContainer,
  ModalBody,
  ButtonContainer,
  CloseIcon,
} from './Modal.styles';

type ModalProps = DialogContentProps & {
  title: string;
  description?: string;
  alignButtons: 'start' | 'end';
  leftButton?: ButtonProps;
  rightButton?: ButtonProps;
};

type Ref =
  | ((instance: HTMLDivElement | null) => void)
  | RefObject<HTMLDivElement>
  | null
  | undefined;

export const Modal = ModalRoot;
export const ModalTrigger = ModalPrimitaveTrigger;

export const ModalContent = React.forwardRef(
  (
    {
      title,
      children,
      description,
      alignButtons = 'end',
      leftButton,
      rightButton,
      ...props
    }: ModalProps,
    ref: Ref
  ) => {
    return (
      <ModalPortal>
        <StyledModalOverlay />
        <StyledModalContent {...props} ref={ref}>
          <div>
            <HeaderContainer>
              <ModalTitle asChild>
                <H5>{title}</H5>
              </ModalTitle>
              <ModalClose asChild>
                <CloseIcon>
                  <RiCloseFill aria-hidden />
                </CloseIcon>
              </ModalClose>
            </HeaderContainer>
            <ModalBody>
              <ModalDescription>{description}</ModalDescription>
              {children}
            </ModalBody>
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
        </StyledModalContent>
      </ModalPortal>
    );
  }
);
