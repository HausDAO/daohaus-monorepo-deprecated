import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Checkbox } from './Checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const BaseCheckbox = Template.bind({});

BaseCheckbox.args = {
  label: 'Sample Checkbox',
  id: 'Sample Checkbox Id',
  disabled: false,
  required: false,
};
