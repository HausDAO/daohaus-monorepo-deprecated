import { HausThemeProvider } from '@daohaus/ui';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <HausThemeProvider>
        <App />
      </HausThemeProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
