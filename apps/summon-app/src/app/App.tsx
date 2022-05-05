import { DaohausConnect } from '@daohaus/daohaus-connect';
import { HausThemeContext } from '@daohaus/ui';
import { useContext } from 'react';

console.log(DaohausConnect);

export function App() {
  const { toggleLightDark } = useContext(HausThemeContext);

  return (
    <>
      <h1>test</h1>
      <button onClick={toggleLightDark}>Toggle Theme</button>
    </>
  );
}

export default App;
