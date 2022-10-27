import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Loading } from './Loading';

export default {
  title: 'Atoms/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

// Setting displayName manually since Storybook displays it as [Object, object]
Loading.displayName = 'Loading';

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const BaseLoading = Template.bind({});

BaseLoading.args = {};
