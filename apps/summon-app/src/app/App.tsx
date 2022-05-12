import { ConnectButton } from '@daohaus/daohaus-connect-feature';
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

  return (
    <TemporaryLayout>
      <nav>
        <ConnectButton />
      </nav>
      <H1>test</H1>
      <Button onClick={toggleLightDark}>Toggle Theme</Button>
    </TemporaryLayout>
  );
}

export default App;
