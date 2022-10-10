import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DropdownButton } from './DropdownButton';

export default {
  title: 'Atoms/DropdownButton',
  component: DropdownButton,
  argTypes: {
    colorVariant: {
      description: 'Set the base theme color for the button',
      defaultValue: 'primary',
      options: ['primary', 'secondary'],
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
} as ComponentMeta<typeof DropdownButton>;

// Setting displayName manually since Storybook displays it as [Object, object]
DropdownButton.displayName = 'DropdownButton';

const Template: ComponentStory<typeof DropdownButton> = (args) => (
  <DropdownButton {...args} />
);

export const BaseDropdownButton = Template.bind({});

BaseDropdownButton.args = {
  children: 'Button',
  colorVariant: 'primary',
  variant: 'solid',
  size: 'md',
  disabled: false,
  width: 'fit-content',
};

export const ProfileDropdownButton = Template.bind({});

ProfileDropdownButton.args = {
  children: 'Button',
  colorVariant: 'primary',
  variant: 'solid',
  size: 'md',
  disabled: false,
  width: 'fit-content',
  profile: {
    src: 'https://bafybeiabmsm2gy3eb7d3b3zx7mqmg7tg54swosqjb2swcwpatgrctu5ry4.ipfs.dweb.link/',
    alt: 'Jord waz here',
  },
};
