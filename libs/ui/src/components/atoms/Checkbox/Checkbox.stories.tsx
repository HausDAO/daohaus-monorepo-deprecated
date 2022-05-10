import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox from './Checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const BaseCheckbox = Template.bind({});

BaseCheckbox.args = {
  children: 'Checkbox',
  secondary: false,
  tertiary: false,
  disabled: false,
};

export const PrimaryCheckbox = Template.bind({});
PrimaryCheckbox.args = {
  children: 'Checkbox',
  disabled: false,
};
