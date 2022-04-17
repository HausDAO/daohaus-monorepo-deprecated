import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { Theme } from '..';
import { Font } from '.';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  * {
    &,
    &::before,
    &::after {
      box-sizing: border-box;
    }
  }
  html {
    font-size: 10px;
    background-color: ${({ theme }: { theme: Theme }) => theme.BgColor};
  }
  body {
    font-family: ${Font.Family.Body};
    color: ${({ theme }: { theme: Theme }) => theme.FontColor}
  }
  `;
