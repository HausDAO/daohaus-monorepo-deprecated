import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { HausThemeProvider } from '@daohaus/ui';

import Routes from './Routes';

const container = document.getElementById('root');

//reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
// THis is how react wants to render the app.
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <StrictMode>
    <HausThemeProvider>
      <HashRouter>
        <Routes />
      </HashRouter>
    </HausThemeProvider>
  </StrictMode>
);
