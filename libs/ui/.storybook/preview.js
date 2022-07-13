import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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
        value: defaultDarkTheme.bgColor,
      },
      {
        name: 'Light',
        value: defaultLightTheme.bgColor,
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
          ? defaultDarkTheme.bgColor
          : defaultLightTheme.bgColor,
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

const WithFormProvider = (Story, context) => {
  const methods = useForm();
  const { watch } = methods;

  const values = watch();

  useEffect(() => {
    if (values) {
      console.log('Form Values', values);
    }
  }, [values]);

  return (
    <FormProvider {...methods}>
      <Story {...context} />
    </FormProvider>
  );
};

export const decorators = [withThemeProvider, WithFormProvider];
