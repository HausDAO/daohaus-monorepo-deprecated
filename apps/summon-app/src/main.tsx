import { HausConnectProvider } from '@daohaus/daohaus-connect-feature';
import { HausThemeProvider } from '@daohaus/ui';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
// FOR DEMONSTRATIOn
// import { limitedNetworkTest } from './app/constants';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <HausThemeProvider>
        <HausConnectProvider>
          <App />
        </HausConnectProvider>
      </HausThemeProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
