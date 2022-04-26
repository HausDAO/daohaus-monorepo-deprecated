import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from './button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: 'Button',
};
export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  children: 'Button',
  secondary: true,
};
export const OutlineButton = Template.bind({});
OutlineButton.args = {
  children: 'Button',
  outline: true,
};
export const SmallButton = Template.bind({});
SmallButton.args = {
  children: 'Button',
  sm: true,
};
export const LargeButton = Template.bind({});
LargeButton.args = {
  children: 'Button',
  lg: true,
  // outline: true,
};
