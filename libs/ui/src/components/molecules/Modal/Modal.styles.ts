import * as ModalPrimitive from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

// Move into colors for any overlays
import { indigoDarkA } from '@radix-ui/colors';

import { Theme } from '../../../types/theming';

export const ModalRoot = ModalPrimitive.Root;
export const ModalPrimitaveTrigger = ModalPrimitive.Trigger;
export const ModalClose = ModalPrimitive.Close;
export const ModalPortal = ModalPrimitive.Portal;
export const ModalTitle = ModalPrimitive.Title;
export const ModalDescription = ModalPrimitive.Description;

const overlayShow = keyframes`
  0% { opacity: 0 };
  100% { opacity: 1 };
`;

export const StyledModalOverlay = styled(ModalPrimitive.Overlay)`
  background-color: ${() => indigoDarkA.indigoA4};
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
  border-radius: 8px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  color: ${({ theme }: { theme: Theme }) => theme.modal.color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: 50%;
  max-height: 85vh;
  max-width: 90vw;
  min-width: 50rem;
  min-height: 23rem;
  padding: 3rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (prefers-reduced-motion: no-preference) {
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &:focus {
    outline: none;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  height: auto;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const CloseIcon = styled.div`
  margin-left: auto;
  cursor: pointer;
  font-size: 24px;
`;

export const ButtonContainer = styled.div<{
  align: 'start' | 'end';
}>`
  align-self: ${(props) => `flex-${props.align}`};
  display: flex;
  gap: 1rem;
`;
