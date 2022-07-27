import { HausConnectProvider } from '@daohaus/daohaus-connect-feature';
import { HausThemeProvider } from '@daohaus/ui';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <HausThemeProvider>
        <HausConnectProvider>
          <Routes />
        </HausConnectProvider>
      </HausThemeProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
