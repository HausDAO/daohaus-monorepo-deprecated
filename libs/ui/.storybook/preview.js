import { sky, skyDark } from '@radix-ui/colors';
import { HausThemeProvider } from '../src/theme';

export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: skyDark.sky1,
      },
      {
        name: 'light',
        value: sky.sky1,
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
