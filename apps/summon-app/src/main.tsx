import { Haus } from '@daohaus/dao-data';
import { HausConnectProvider } from '@daohaus/daohaus-connect-feature';
import { HausThemeProvider } from '@daohaus/ui';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';



ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <HausConnectProvider haus={}>
        <HausThemeProvider>
          <App />
        </HausThemeProvider>
      </HausConnectProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
