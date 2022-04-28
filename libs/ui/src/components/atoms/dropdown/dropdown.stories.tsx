import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../button/button';
import { ParXs } from '../typography';
import Dropdown from './dropdown';
import { DropdownPanel } from './dropdownExtras';

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
    <DropdownPanel>{<ParXs>This is a dropdown menu</ParXs>}</DropdownPanel>,
    <Button fullWidth secondary>
      test 1
    </Button>,
    <Button fullWidth secondary>
      test 2
    </Button>,
  ],
};
