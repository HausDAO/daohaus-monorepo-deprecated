import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { HausThemeProvider } from '@daohaus/ui';

import App from './pages/App';

ReactDOM.render(
  <StrictMode>
    <HausThemeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HausThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
