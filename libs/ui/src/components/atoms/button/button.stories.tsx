import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from './button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

// Setting displayName manually since Storybook displays it as [Object, object]
Button.displayName = 'Button';

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const BaseButton = Template.bind({});

BaseButton.args = {
  children: 'Button',
  secondary: false,
  tertiary: false,
  sm: false,
  lg: false,
  onClick: () => alert('clicked me'),
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: 'Button',
  disabled: false,
};
export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  children: 'Button',
  secondary: true,
  disabled: false,
};
export const TertiaryButton = Template.bind({});
TertiaryButton.args = {
  children: 'Button',
  tertiary: true,
  disabled: false,
};
export const SmallButton = Template.bind({});
SmallButton.args = {
  children: 'Button',
  sm: true,
  disabled: false,
};
export const LargeButton = Template.bind({});
LargeButton.args = {
  children: 'Button',
  lg: true,
  disabled: false,
};
