import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BiError } from 'react-icons/bi';
import Button from '../button/button';
import { ParXs } from '../typography';
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
  trigger: (
    <Button icon={BiError} tertiary>
      Network Unavailable
    </Button>
  ),
  items: [
    {
      type: 'label',
      content: <ParXs>0x...</ParXs>,
    },
    {
      type: 'clickable',
      content: (
        <Button fullWidth secondary leftAlign>
          test 1
        </Button>
      ),
    },
    {
      type: 'clickable',
      content: (
        <Button fullWidth secondary leftAlign>
          test 2
        </Button>
      ),
    },
  ],
};
