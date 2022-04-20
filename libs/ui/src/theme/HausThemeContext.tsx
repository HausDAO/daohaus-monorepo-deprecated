import {
  createContext,
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global/globalStyles';
import { Theme, defaultDarkTheme, defaultLightTheme } from './theme';
import './global/fonts.css';

type ReactSetter<T> = Dispatch<SetStateAction<T>>;

type HausUI = {
  theme: Theme;
  setTheme: ReactSetter<Theme>;
  toggleLightDark: () => void;
};

export const HausThemeContext = createContext<HausUI>({
  theme: defaultDarkTheme,
  setTheme: () => null,
  toggleLightDark: (): void => undefined,
});

export const HausThemeProvider: FunctionComponent<{
  defaultDark?: Theme;
  defaultLight?: Theme;
  startDark?: boolean;
}> = ({
  children,
  defaultDark = defaultDarkTheme,
  defaultLight = defaultLightTheme,
  startDark = true,
}) => {
  const [theme, setTheme] = useState(startDark ? defaultDark : defaultLight);

  useEffect(() => {
    //  handles updates after component mount
    //  mostly used for storybook theme toggle
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
        <GlobalStyles theme={theme} />
        {children}
      </ThemeProvider>
    </HausThemeContext.Provider>
  );
};

export default HausThemeProvider;
