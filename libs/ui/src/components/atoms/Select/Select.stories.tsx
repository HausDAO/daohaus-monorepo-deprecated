import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from './Select';
export default {
  title: 'Atoms/Form/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const BaseSelect = Template.bind({});
BaseSelect.args = {
  options: [
    { name: 'Option 1', value: 'option2' },
    { name: 'Option 2', value: 'option1' },
  ],
};
export const DisabledSelect = Template.bind({});
DisabledSelect.args = {
  options: [
    { name: 'Option 1', value: 'option2' },
    { name: 'Option 2', value: 'option1' },
  ],
};
export const LongSelect = Template.bind({});
DisabledSelect.args = {
  options: [
    { name: 'Option 1', value: 'option2' },
    { name: 'Option 2', value: 'option1' },
  ],
  long: true,
};
export const FullWidthSelect = Template.bind({});
DisabledSelect.args = {
  options: [
    { name: 'Option 1', value: 'option2' },
    { name: 'Option 2', value: 'option1' },
  ],
  full: true,
};

export const ErrorSelect = Template.bind({});
ErrorSelect.args = {
  options: [
    { name: 'Option 1', value: 'option2' },
    { name: 'Option 2', value: 'option1' },
  ],
  error: {
    type: 'error',
    message: 'This is an error message',
  },
};
export const WarningSelect = Template.bind({});
WarningSelect.args = {
  options: [
    { name: 'Option 1', value: 'option2' },
    { name: 'Option 2', value: 'option1' },
  ],
  warning: {
    type: 'warning',
    message: 'This is an error message',
  },
};
export const SuccessSelect = Template.bind({});
SuccessSelect.args = {
  options: [
    { name: 'Option 1', value: 'option2' },
    { name: 'Option 2', value: 'option1' },
  ],
  success: {
    type: 'success',
    message: 'This is a success message',
  },
};
