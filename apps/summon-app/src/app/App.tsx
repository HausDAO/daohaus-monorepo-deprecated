import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { Button, H1, HausThemeContext } from '@daohaus/ui';
import { useContext } from 'react';
import styled from 'styled-components';

const TemporaryLayout = styled.main`
  nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

export function App() {
  const { toggleLightDark } = useContext(HausThemeContext);
  const { connectWallet, isConnected, disconnect } = useHausConnect();

  return (
    <TemporaryLayout>
      <nav>
        {isConnected ? (
          <Button sm onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button onClick={connectWallet}>Connect</Button>
        )}
      </nav>
      <H1>test</H1>
      <Button onClick={toggleLightDark}>Toggle Theme</Button>
    </TemporaryLayout>
  );
}

export default App;
