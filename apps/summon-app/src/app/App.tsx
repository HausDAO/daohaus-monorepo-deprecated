import { DaoHausNav, ExplorerLink } from '@daohaus/daohaus-connect-feature';
import { Button, H1, HausThemeContext } from '@daohaus/ui';
import { useContext } from 'react';
import styled from 'styled-components';

const TemporaryLayout = styled.main`
  width: 100%;
`;

export function App() {
  const { toggleLightDark } = useContext(HausThemeContext);

  return (
    <TemporaryLayout>
      <ExplorerLink address="0x756ee8B8E898D497043c2320d9909f1DD5a7077F">
        Link
      </ExplorerLink>
      <DaoHausNav />
      <H1>test</H1>
      <Button onClick={toggleLightDark}>Toggle Theme</Button>
    </TemporaryLayout>
  );
}

export default App;
