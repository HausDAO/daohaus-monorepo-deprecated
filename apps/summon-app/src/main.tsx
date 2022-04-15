import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from '@daohaus/ui';

import App from './app/App';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
