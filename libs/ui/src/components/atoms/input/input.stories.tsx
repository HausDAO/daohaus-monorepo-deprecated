import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from './input';
import { BsSearch } from 'react-icons/bs';
import { InputType } from './types';

export default {
  title: 'Atoms/Input',
  component: Input,
} as ComponentMeta<InputType>;

const Template: ComponentStory<InputType> = (args) => <Input {...args} />;

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
// export const InputAtom = () => <Input />;
// export const InputAtom2 = () => <Input />;
// export const InputAtom3 = () => <Input />;
