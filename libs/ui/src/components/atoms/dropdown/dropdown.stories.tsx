import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BsXCircle } from 'react-icons/bs';
import Button from '../button/button';
import Dropdown from './dropdown';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const DropDown = Template.bind({});

DropDown.args = {
  trigger: <Button>Test</Button>,
  items: [
    {
      content: 'Click',
      onClick: () => alert('Click'),
    },
  ],
};
