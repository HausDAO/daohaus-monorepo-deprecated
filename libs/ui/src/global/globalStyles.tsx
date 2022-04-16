import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { Theme } from '../theme';
import { Font } from '../theme/global';

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
    background-color: ${({ theme }: { theme: Theme }) => theme.Color.Bg};
  }
  body {
    font-family: ${Font.Family.Body};
    color: ${({ theme }: { theme: Theme }) => theme.Color.Font}
  }
  `;
