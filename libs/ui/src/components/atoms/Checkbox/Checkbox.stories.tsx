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
  label: 'Sample Checkbox',
  id: 'Sample Checkbox Id',
  defaultChecked: false,
  disabled: false,
  required: false,
};

export const CheckboxAtomChecked = Template.bind({});
CheckboxAtomChecked.args = {
  label: 'Sample Checked Checkbox',
  id: 'Sample Checked Checkbox Id',
  defaultChecked: true,
};

export const CheckboxAtomDisabled = Template.bind({});
CheckboxAtomDisabled.args = {
  label: 'Sample Disabled Checkbox',
  id: 'Sample Disabled Checkbox Id',
  disabled: true,
};

export const CheckboxAtomRequired = Template.bind({});
CheckboxAtomRequired.args = {
  label: 'Sample Required Checkbox',
  id: 'Sample Required Checkbox Id',
  required: true,
};
