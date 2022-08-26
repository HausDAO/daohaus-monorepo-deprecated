import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine, RiArrowDropDownLine } from 'react-icons/ri';
import { ButtonV2 } from './ButtonV2';

export default {
  title: 'Atoms/ButtonV2',
  component: ButtonV2,
  argTypes: {
    theme: {
      description: 'Set the base theme color for the button',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    variant: {
      description: 'Set the variant of the button',
      options: ['solid', 'outline', 'link'],
      control: { type: 'radio' },
    },
    size: {
      description: 'Set the size of the button',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof ButtonV2>;

const Template: ComponentStory<typeof ButtonV2> = (args) => (
  <ButtonV2 {...args} />
);

export const BaseButton = Template.bind({});

BaseButton.args = {
  children: 'Button',
  onClick: () => alert('clicked me'),
  disabled: false,
  theme: 'primary',
  variant: 'solid',
  size: 'md',
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: 'Button',
};

export const PrimaryButtonOutline = Template.bind({});
PrimaryButtonOutline.args = {
  children: 'Button',
  variant: 'outline',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  children: 'Button',
  theme: 'secondary',
};

export const SecondaryButtonOutline = Template.bind({});
SecondaryButtonOutline.args = {
  children: 'Button',
  theme: 'secondary',
  variant: 'outline',
};

export const PrimaryButtonWithIcons = Template.bind({});
PrimaryButtonWithIcons.args = {
  children: 'Button',
  IconLeft: RiAlertLine,
  IconRight: RiArrowDropDownLine,
};

export const TertiaryButton = Template.bind({});
TertiaryButton.args = {
  children: 'Button',
};

export const TertiaryButtonWithIcons = Template.bind({});
TertiaryButtonWithIcons.args = {
  children: 'Button',
  IconLeft: RiAlertLine,
  IconRight: RiArrowDropDownLine,
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
