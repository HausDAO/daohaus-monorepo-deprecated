import { normalize } from 'polished';
import { FunctionComponent } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyleProvider = createGlobalStyle`
  ${normalize()}
  html {
    font-size: 10px;
    background-color: #050a1b;
    box-sizing: border-box;
  }
  body {
    font-family: 'Mulish';
    color: white;
  }
`;

const GlobalStyles: FunctionComponent = ({ children }) => {
  return <GlobalStyleProvider>{children}</GlobalStyleProvider>;
};

export default GlobalStyles;
