import { ComponentMeta, ComponentStory } from '@storybook/react';
import ValueLabel from './ValueLabel';

export default {
  title: 'Atoms/Form/ValueLabel',
  component: ValueLabel,
} as ComponentMeta<typeof ValueLabel>;

const Template: ComponentStory<typeof ValueLabel> = (args) => (
  <ValueLabel {...args} />
);

export const BaseLabel = Template.bind({});
BaseLabel.args = {
  children: 'Value Label',
};

export const WithRequired = Template.bind({});
WithRequired.args = {
  children: 'With Required',
  required: true,
};
