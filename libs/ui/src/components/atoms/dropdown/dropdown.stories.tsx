import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BsXCircle } from 'react-icons/bs';
import Button from '../button/button';
import Dropdown from './dropdown';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
    <Dropdown {...args} />
  </div>
);

export const DropDown = Template.bind({});

DropDown.args = {
  trigger: <Button>Test</Button>,
  items: [
    <Button fullWidth secondary>
      test 1
    </Button>,
    <Button fullWidth secondary>
      test 2
    </Button>,
  ],
};
