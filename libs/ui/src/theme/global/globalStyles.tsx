import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { Theme } from '..';
import { font } from '.';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  * {
    &,
    &::before,
    &::after {
      box-sizing: border-box;
    }
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  text-rendering: optimizeLegibility;

  h1, h2, h3, h4, h5, h6, p{
    margin: 0;
    line-height: 150%;
    letter-spacing: 1.5px;
  }

  html {
    font-size: 10px;
    background-color: ${({ theme }: { theme: Theme }) => theme.bgColor};
  }
  body {
    font-family: ${font.family.body};
    color: ${({ theme }: { theme: Theme }) => theme.fontColor}
  }
  `;
