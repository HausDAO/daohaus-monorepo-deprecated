import { HausConnectProvider } from '@daohaus/daohaus-connect-feature';
import { HausThemeProvider } from '@daohaus/ui';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './pages/App';

export const validNetworks = {
  '0x1': {
    chainId: '0x1',
    networkId: 1,
    name: 'Mainnet',
    symbol: 'ETH',
    rpc: import.meta.env.VITE_RPC_URL,
    explorer: 'https://etherscan.io',
  },
  '0x5': {
    chainId: '0x5',
    networkId: 5,
    name: 'Goerli',
    symbol: 'ETH',
    rpc: import.meta.env.VITE_RPC_URL,
    explorer: 'https://goerli.etherscan.io',
  },
};

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <HausThemeProvider>
        <HausConnectProvider networks={validNetworks}>
          <App />
        </HausConnectProvider>
      </HausThemeProvider>
    </HashRouter>
  </StrictMode>,
  document.getElementById('root')
);
