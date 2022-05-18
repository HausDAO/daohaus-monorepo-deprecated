import { Button, HausThemeContext } from '@daohaus/ui';
import { useContext } from 'react';

export function App() {
  const { toggleLightDark } = useContext(HausThemeContext);

  return (
    <>
      <h1>test</h1>
      <Button onClick={toggleLightDark}>Toggle Theme</Button>
    </>
  );
}

export default App;
