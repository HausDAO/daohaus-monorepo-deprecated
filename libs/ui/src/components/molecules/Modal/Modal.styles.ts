import * as ModalPrimitive from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

import { blackA, indigoDarkA } from '@radix-ui/colors';

import { Theme } from '../../../types/theming';

export const ModalRoot = ModalPrimitive.Root;
export const ModalTrigger = ModalPrimitive.Trigger;
export const ModalClose = ModalPrimitive.Close;
export const ModalPortal = ModalPrimitive.Portal;

const overlayShow = keyframes`
  0% { opacity: 0 };
  100% { opacity: 1 };
`;

export const StyledModalOverlay = styled(ModalPrimitive.Overlay)`
  background-color: ${({ theme }: { theme: Theme }) => indigoDarkA.indigoA4};
  position: fixed;
  inset: 0;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  } ;
`;

const contentShow = keyframes`
  0% { opacity: 0; transform: translate(-50%, -48%) scale(.96) };
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1) };
`;

export const StyledModalContent = styled(ModalPrimitive.Content)`
  background-color: ${({ theme }: { theme: Theme }) => theme.modal.bg};
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &:focus {
    outline: none;
  }
`;

export const StyledModalTitle = styled(ModalPrimitive.Title)`
  margin: 0;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.modal.color};
  font-size: 17px;
`;

export const StyledModalDescription = styled(ModalPrimitive.Description)`
  margin: 10px 0 20px;
  color: ${({ theme }: { theme: Theme }) => theme.modal.color};
  font-size: 15px;
  line-height: 1.5px;
`;

export const Fieldset = styled.fieldset`
  all: unset;
  display: flex;
  gap: 20;
  align-items: 'center';
  margin-bottom: 15px;
`;

export const CloseIcon = styled.div`
  cursor: pointer;
  font-size: 17px;
`;

export const Flex = styled.div`
  display: flex;
`;
