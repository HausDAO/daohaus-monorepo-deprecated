import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from './input';
import { BsSearch } from 'react-icons/bs';

export default {
  title: 'Atoms/Form/Input',
  component: Input,
} as ComponentMeta<typeof Input>;
Input.displayName = 'Input';
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const AtomInput = Template.bind({});

AtomInput.args = {
  placeholder: 'Placeholder',
};
export const InputWithIcon = Template.bind({});
InputWithIcon.args = {
  placeholder: 'Placeholder',
  icon: BsSearch,
};
export const InputDisabled = Template.bind({});
InputDisabled.args = {
  placeholder: 'Disabled',
  disabled: true,
};
export const InputWarning = Template.bind({});
InputWarning.args = {
  placeholder: 'Warning',
  warning: {
    type: 'warning',
    message: 'This should not be visible',
  },
};
export const InputError = Template.bind({});
InputError.args = {
  placeholder: 'Error',
  error: {
    type: 'error',
    message: 'This should not be visible',
  },
};
export const NumberInput = Template.bind({});
NumberInput.args = {
  placeholder: '0123456789',
  number: true,
};
export const LongInput = Template.bind({});
LongInput.args = {
  placeholder: '52rem',
  long: true,
};
export const FullWidthInput = Template.bind({});
FullWidthInput.args = {
  placeholder: '100% of container',
  full: true,
};
export const AddressInput = Template.bind({});
AddressInput.args = {
  placeholder: '0x',
  address: true,
};
