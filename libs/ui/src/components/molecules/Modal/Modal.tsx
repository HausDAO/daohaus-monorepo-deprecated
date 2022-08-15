import React, { RefObject } from 'react';
import { RiCloseFill } from 'react-icons/ri';

import { ModalProps } from '../../../types/modal.types';
import { Button, H5 } from '../../atoms';
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
