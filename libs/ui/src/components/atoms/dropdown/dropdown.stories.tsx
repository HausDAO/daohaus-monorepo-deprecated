import { ComponentMeta, ComponentStory } from '@storybook/react';
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
  trigger: <Button>Test</Button>,
  // spacing: '0',
  items: [
    {
      type: 'label',
      content: <ParXs>0x...</ParXs>,
    },
    {
      type: 'button',
      content: (
        <Button fullWidth secondary leftAlign>
          test 1
        </Button>
      ),
    },
    {
      type: 'button',
      content: (
        <Button fullWidth secondary leftAlign>
          test 2
        </Button>
      ),
    },
  ],
};
