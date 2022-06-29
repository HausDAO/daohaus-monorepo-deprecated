import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { HausThemeProvider } from '@daohaus/ui';
import { HausConnectProvider } from '@daohaus/daohaus-connect-feature';

import Routes from './Routes';

ReactDOM.render(
  <StrictMode>
    <HausThemeProvider>
      <HashRouter>
        <HausConnectProvider>
          <Routes />
        </HausConnectProvider>
      </HashRouter>
    </HausThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
