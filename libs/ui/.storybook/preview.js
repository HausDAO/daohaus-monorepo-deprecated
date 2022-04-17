import {
  defaultDarkTheme,
  defaultLightTheme,
  HausThemeProvider,
} from '../src/theme';

export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: defaultDarkTheme.BgColor,
      },
      {
        name: 'light',
        value: defaultLightTheme.BgColor,
      },
    ],
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'Dark',
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['Dark', 'Light'],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

const withThemeProvider = (Story, context) => {
  const mode = context.globals.theme === 'Dark' ? true : false;
  return (
    <HausThemeProvider startDark={mode}>
      <Story {...context} />
    </HausThemeProvider>
  );
};

export const decorators = [withThemeProvider];
