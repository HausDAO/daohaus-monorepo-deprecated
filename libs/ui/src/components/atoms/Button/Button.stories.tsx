import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine, RiArrowDropDownLine } from 'react-icons/ri';
import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

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
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  children: 'Button',
  secondary: true,
};

export const SecondaryButtonWithIcons = Template.bind({});
SecondaryButtonWithIcons.args = {
  children: 'Button',
  secondary: true,
  IconLeft: RiAlertLine,
  IconRight: RiArrowDropDownLine,
};

export const TertiaryButton = Template.bind({});
TertiaryButton.args = {
  children: 'Button',
  tertiary: true,
};

export const TertiaryButtonWithIcons = Template.bind({});
TertiaryButtonWithIcons.args = {
  children: 'Button',
  tertiary: true,
  IconLeft: RiAlertLine,
  IconRight: RiArrowDropDownLine,
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
};

export const IconLeftButton = Template.bind({});
IconLeftButton.args = {
  children: 'Button',
  IconLeft: RiAlertLine,
};

export const IconRightButton = Template.bind({});
IconRightButton.args = {
  children: 'Button',
  IconRight: RiArrowDropDownLine,
};

export const IconBothButton = Template.bind({});
IconBothButton.args = {
  children: 'Button',
  IconLeft: RiAlertLine,
  IconRight: RiArrowDropDownLine,
};
