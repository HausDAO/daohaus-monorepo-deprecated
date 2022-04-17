import {
  defaultDarkTheme,
  defaultLightTheme,
  HausThemeProvider,
} from '../src/theme';

export const parameters = {
  backgrounds: {
    default: 'Dark',
    values: [
      {
        name: 'Dark',
        value: defaultDarkTheme.BgColor,
      },
      {
        name: 'Light',
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

const handleBGReplace = (context) => ({
  ...context,
  globals: {
    ...context.globals,
    backgrounds: {
      value:
        context?.globals?.theme === 'Dark'
          ? defaultDarkTheme.BgColor
          : defaultLightTheme.BgColor,
    },
  },
});

const withThemeProvider = (Story, context) => {
  const isDark = context.globals.theme === 'Dark' ? true : false;
  const updatedContext = handleBGReplace(context);
  return (
    <HausThemeProvider startDark={isDark}>
      <Story {...updatedContext} />
    </HausThemeProvider>
  );
};

export const decorators = [withThemeProvider];
