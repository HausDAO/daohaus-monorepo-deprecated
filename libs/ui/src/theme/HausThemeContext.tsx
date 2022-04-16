import {
  createContext,
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../global';
import { Theme, defaultTheme as hausTheme } from './defaultTheme';
import './global/fonts.css';

type ReactSetter<T> = Dispatch<SetStateAction<T>>;

type HausUI = {
  theme: Theme;
  setTheme: ReactSetter<Theme>;
};

export const HausThemeContext = createContext<HausUI>({
  theme: hausTheme,
  setTheme: () => null,
});

export const HausThemeProvider: FunctionComponent<{ defaultTheme?: Theme }> = ({
  children,
  defaultTheme = hausTheme,
}) => {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <HausThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </HausThemeContext.Provider>
  );
};

export default HausThemeProvider;
