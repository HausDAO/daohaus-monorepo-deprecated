import * as ToastPrimitive from '@radix-ui/react-toast';
import styled, { keyframes } from 'styled-components';

import { Theme } from '../../../types/theming';

export const ToastProvider = ToastPrimitive.Provider;
export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
export const ToastClose = ToastPrimitive.Close;

const VIEWPORT_PADDING = 25;

const hide = keyframes`
0% { opacity: 1 };
  100% { opacity: 0 };
  `;

const slideIn = keyframes`
from { transform: translateX(calc(100% + ${VIEWPORT_PADDING}px)) };
to { transform: 'translateX(0)' };
`;

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

export const ToastViewport = styled(ToastPrimitive.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  width: 395px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

export const ToastRoot = styled(ToastPrimitive.Root)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }: { theme: Theme }) => theme.card.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.card.border};
  border-radius: 0.8rem;
  height: auto;
  padding: 2rem;
  width: auto;

  &.success {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.successBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.card.successBorder};
  }

  &.warning {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.warningBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.card.warningBorder};
  }

  &.error {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.errorBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.card.errorBorder};
  }

  @media (prefers-reduced-motion: no-preference) {
    &[data-state='open'] {
      animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    &[data-state='closed'] {
      animation: ${hide} 100ms ease-in forwards;
    }
    &[data-swipe='move'] {
      transform: 'translateX(var(--radix-toast-swipe-move-x))';
    }
    &[data-swipe='cancel'] {
      transform: 'translateX(0)';
      transition: 'transform 200ms ease-out';
    }
    &[data-swipe='end'] {
      animation: ${swipeOut} 100ms ease-out forwards;
    }
  } ;
`;

export const ToastHeaderContainer = styled.div`
  display: flex;
`;

export const ToastIcon = styled.span<{
  toastType: 'default' | 'success' | 'warning' | 'error';
}>`
  color: ${(props) => props.theme[props.toastType]};
  font-size: 24px;
  margin-right: 1rem;
`;

export const ToastCopyContainer = styled.div`
  display: block;
  width: 100%;
`;

export const ToastAction = styled(ToastPrimitive.Action)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CloseIcon = styled.div`
  cursor: pointer;
  font-size: 17px;
`;
