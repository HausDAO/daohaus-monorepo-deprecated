import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WrappedCheckbox } from './WrappedCheckbox';

export default {
  title: 'Molecules/Form/WrappedCheckbox',
  component: WrappedCheckbox,
} as ComponentMeta<typeof WrappedCheckbox>;

const Template: ComponentStory<typeof WrappedCheckbox> = (args) => {
  return (
    <div style={{ margin: '4rem' }}>
      <WrappedCheckbox {...args} />
    </div>
  );
};

export const FullWrappedCheckbox = Template.bind({});
FullWrappedCheckbox.args = {
  id: 'Example Checkbox',
  label: 'Complete Input',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  checkboxes: [
    {
      id: 'Example Checkbox',
      label: 'Complete Input',
      defaultChecked: false,
      disabled: false,
      required: false,
    },
  ],
};

export const MultipleWrappedCheckbox = Template.bind({});
MultipleWrappedCheckbox.args = {
  id: 'Example of Multiple Checkbox',
  label: 'Multiple Checkboxes',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  checkboxes: [
    {
      label: 'Sample Checkbox 1',
      id: 'Sample Checkbox 1 Id',
      defaultChecked: false,
      disabled: false,
      required: false,
    },
    {
      label: 'Sample Checkbox 2',
      id: 'Sample Checkbox 2 Id',
      defaultChecked: true,
      disabled: false,
      required: false,
    },
  ],
};
