import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Checkbox } from './Checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const CheckboxAtom = Template.bind({});
CheckboxAtom.args = {
  id: 'Sample Checkbox Id',
  title: 'Sample Checkbox',
  checked: false,
  defaultChecked: false,
  disabled: false,
  required: false,
};

export const CheckboxAtomChecked = Template.bind({});
CheckboxAtomChecked.args = {
  title: 'Sample Checked Checkbox',
  id: 'Sample Checked Checkbox Id',
  defaultChecked: true,
};

export const CheckboxAtomDisabled = Template.bind({});
CheckboxAtomDisabled.args = {
  title: 'Sample Disabled Checkbox',
  id: 'Sample Disabled Checkbox Id',
  disabled: true,
};

export const CheckboxAtomRequired = Template.bind({});
CheckboxAtomRequired.args = {
  title: 'Sample Required Checkbox',
  id: 'Sample Required Checkbox Id',
  required: true,
};
