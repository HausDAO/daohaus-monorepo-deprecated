import { createContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global/globalStyles';
import { defaultDarkTheme, defaultLightTheme } from './theme';
import { Theme } from '../types/theming';
import './global/fonts.css';
import { ReactSetter } from '@daohaus/common-utilities';

type HausUI = {
  theme: Theme;
  setTheme: ReactSetter<Theme>;
  toggleLightDark: () => void;
};

type ProviderProps = {
  children: ReactNode;
  defaultDark?: Theme;
  defaultLight?: Theme;
  startDark?: boolean;
};

export const HausThemeContext = createContext<HausUI>({
  theme: defaultDarkTheme,
  setTheme: () => null,
  toggleLightDark: (): void => undefined,
});

export const HausThemeProvider = ({
  children,
  defaultDark = defaultDarkTheme,
  defaultLight = defaultLightTheme,
  startDark = true,
}: ProviderProps) => {
  const [theme, setTheme] = useState(startDark ? defaultDark : defaultLight);

  useEffect(() => {
    setTheme(startDark ? defaultDark : defaultLight);
  }, [startDark, defaultDark, defaultLight]);

  const toggleLightDark = () => {
    setTheme((prevState) =>
      prevState.themeName === defaultDark.themeName ? defaultLight : defaultDark
    );
  };
  return (
    <HausThemeContext.Provider value={{ theme, setTheme, toggleLightDark }}>
      <ThemeProvider theme={theme}>
        <>
          {children}
          <GlobalStyles theme={theme} />
        </>
      </ThemeProvider>
    </HausThemeContext.Provider>
  );
};

export default HausThemeProvider;
