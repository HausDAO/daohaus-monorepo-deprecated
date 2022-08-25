import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine, RiArrowDropDownLine } from 'react-icons/ri';
import { ButtonV2 } from './ButtonV2';

export default {
  title: 'Atoms/ButtonV2',
  component: ButtonV2,
} as ComponentMeta<typeof ButtonV2>;

// Setting displayName manually since Storybook displays it as [Object, object]
ButtonV2.displayName = 'Button';

const Template: ComponentStory<typeof ButtonV2> = (args) => (
  <ButtonV2 {...args} />
);

export const BaseButton = Template.bind({});

BaseButton.args = {
  children: 'Button',
  onClick: () => alert('clicked me'),
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: 'Button',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  children: 'Button',
};

export const SecondaryButtonWithIcons = Template.bind({});
SecondaryButtonWithIcons.args = {
  children: 'Button',
  leftIcon: RiAlertLine,
  rightIcon: RiArrowDropDownLine,
};

export const TertiaryButton = Template.bind({});
TertiaryButton.args = {
  children: 'Button',
};

export const TertiaryButtonWithIcons = Template.bind({});
TertiaryButtonWithIcons.args = {
  children: 'Button',
  leftIcon: RiAlertLine,
  rightIcon: RiArrowDropDownLine,
};

export const SmallButton = Template.bind({});
SmallButton.args = {
  children: 'Button',
};

export const LargeButton = Template.bind({});
LargeButton.args = {
  children: 'Button',
};

export const IconLeftButton = Template.bind({});
IconLeftButton.args = {
  children: 'Button',
  leftIcon: RiAlertLine,
};

export const IconRightButton = Template.bind({});
IconRightButton.args = {
  children: 'Button',
  rightIcon: RiArrowDropDownLine,
};

export const IconBothButton = Template.bind({});
IconBothButton.args = {
  children: 'Button',
  leftIcon: RiAlertLine,
  rightIcon: RiArrowDropDownLine,
};
