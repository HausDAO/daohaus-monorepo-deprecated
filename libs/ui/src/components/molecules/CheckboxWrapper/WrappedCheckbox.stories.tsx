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
};

// TODO Rowdy Add support for multiple checkboxes
// export const MultipleWrappedCheckbox = Template.bind({});
// MultipleWrappedCheckbox.args = {
//   id: 'Example Checkbox',
//   label: 'Complete Input',
//   helperText: 'Test the action/controls',
//   info: 'This is controlled by the info prop',
//   warning: undefined,
//   error: undefined,
//   success: undefined,
// };
