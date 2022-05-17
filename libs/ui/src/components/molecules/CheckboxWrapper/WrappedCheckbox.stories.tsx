import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { WrappedCheckbox } from './WrappedCheckbox';

export default {
  title: 'Molecules/Form/WrappedCheckbox',
  component: WrappedCheckbox,
} as ComponentMeta<typeof WrappedCheckbox>;

const Template: ComponentStory<typeof WrappedCheckbox> = (args) => {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div style={{ margin: '4rem' }}>
        <WrappedCheckbox {...args} />
      </div>
      <button onSubmit={onSubmit}>Submit</button>
    </form>
  );
};

export const FullWrappedCheckbox = Template.bind({});
FullWrappedCheckbox.args = {
  id: 'exampleCheckbox',
  label: 'Complete Input',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  checkboxes: [
    {
      id: 'exampleCheckbox',
      title: 'completeInput',
      name: 'test0',
      value: undefined,
      defaultChecked: false,
      disabled: false,
      required: false,
    },
  ],
};

export const MultipleWrappedCheckbox = Template.bind({});
MultipleWrappedCheckbox.args = {
  id: 'multipleCheckboxId',
  label: 'Multiple Checkboxes',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  checkboxes: [
    {
      id: 'childCheckboxId1',
      title: 'sampleCheckbox1',
      name: 'test1',
      value: undefined,
      defaultChecked: false,
      disabled: false,
      required: false,
    },
    {
      id: 'childCheckboxId2',
      title: 'sampleCheckbox2',
      name: 'test2',
      value: undefined,
      defaultChecked: true,
      disabled: false,
      required: false,
    },
  ],
};
