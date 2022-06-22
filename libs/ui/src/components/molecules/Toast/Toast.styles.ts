import * as ToastPrimitive from '@radix-ui/react-toast';
import styled, { keyframes } from 'styled-components';

import { font } from '../../../theme/global/font';
import { fadeIn } from '../../../animations/general';
import { Theme } from '../../../types/theming';
import { border } from '../../../theme/global/border';

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

export const ToastProvider = ToastPrimitive.Provider;
export const ToastClose = ToastPrimitive.Close;

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
  background-color: ${({ theme }: { theme: Theme }) => theme.tooltip.bg};
  border-radius: 8px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: 'title action" "description action';
  grid-template-columns: 'auto max-content';
  column-gap: 15px;
  align-items: 'center';

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

export const ToastTitle = styled(ToastPrimitive.Title)`
  grid-area: 'title';
  margin-bottom: 5px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.fontColor};
  font-size: 15px;
`;

export const ToastDescription = styled(ToastPrimitive.Description)`
  grid-area: 'description';
  margin: 0;
  color: ${({ theme }: { theme: Theme }) => theme.fontColor};
  font-size: 13px;
  line-height: 1.3;
`;

export const ToastAction = styled(ToastPrimitive.Action)`
  grid-area: 'action';
`;
