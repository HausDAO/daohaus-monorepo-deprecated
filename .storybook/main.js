module.exports = {
  stories: [],
  // not sure how this error was intriduced, but was able to fix with this
  // ref: https://github.com/storybookjs/storybook/issues/17996
  addons: ['@storybook/addon-actions', '@storybook/addon-essentials'],
  // addons: [
  //   {
  //     name: '@storybook/addon-essentials',
  //     options: {
  //       actions: false,
  //     },
  //   },
  // ],
  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};
