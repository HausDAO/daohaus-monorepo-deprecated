import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine, RiArrowDropDownLine } from 'react-icons/ri';
import { ButtonV2 } from './ButtonV2';

export default {
  title: 'Atoms/ButtonV2',
  component: ButtonV2,
  argTypes: {
    theme: {
      description: 'Set the base theme color for the button',
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    variant: {
      description: 'Set the variant of the button',
      defaultValue: 'solid',
      options: ['solid', 'outline', 'link'],
      control: { type: 'radio' },
    },
    size: {
      description: 'Set the size of the button',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof ButtonV2>;

// Setting displayName manually since Storybook displays it as [Object, object]
ButtonV2.displayName = 'ButtonV2';

const Template: ComponentStory<typeof ButtonV2> = (args) => (
  <ButtonV2 {...args} />
);

export const BaseButton = Template.bind({});

BaseButton.args = {
  children: 'Button',
  onClick: () => alert('clicked me'),
  theme: 'primary',
  variant: 'solid',
  size: 'md',
  disabled: false,
  width: 'fit-content',
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

export const PrimaryButtonAsLink = Template.bind({});
PrimaryButtonAsLink.args = {
  children: 'Button',
  variant: 'link',
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

export const SecondaryButtonAsLink = Template.bind({});
SecondaryButtonAsLink.args = {
  children: 'Button',
  theme: 'secondary',
  variant: 'link',
};

export const ButtonLeftIcon = Template.bind({});
ButtonLeftIcon.args = {
  children: 'Button',
  IconLeft: RiAlertLine,
};

export const ButtonRightIcon = Template.bind({});
ButtonRightIcon.args = {
  children: 'Button',
  IconRight: RiArrowDropDownLine,
};

export const ButtonWithLeftAndRightIcons = Template.bind({});
ButtonWithLeftAndRightIcons.args = {
  children: 'Button',
  IconLeft: RiAlertLine,
  IconRight: RiArrowDropDownLine,
};
