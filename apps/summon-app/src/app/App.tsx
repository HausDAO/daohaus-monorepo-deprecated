import { HausThemeContext } from '@daohaus/ui';
import { useContext } from 'react';

export function App() {
  const { toggleLightDark } = useContext(HausThemeContext);

  const handleLightDark = () => {
    toggleLightDark();
  };
  return (
    <>
      <h1>test</h1>
      <button onClick={handleLightDark}>Toggle Theme</button>;
    </>
  );
}

export default App;
