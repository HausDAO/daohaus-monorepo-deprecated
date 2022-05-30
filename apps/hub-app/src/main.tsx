import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { HausThemeProvider } from '@daohaus/ui';
import { HausConnectProvider } from '@daohaus/daohaus-connect-feature';

import App from './pages/App';

ReactDOM.render(
  <StrictMode>
    <HausThemeProvider>
      <HashRouter>
        <HausConnectProvider>
          <App />
        </HausConnectProvider>
      </HashRouter>
    </HausThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
