import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import WrappedInput from './wrappedInput';
import { FormProvider, useForm } from 'react-hook-form';

export default {
  title: 'Molecules/Form/WrappedInput',
  component: WrappedInput,
} as ComponentMeta<typeof WrappedInput>;

const Template: ComponentStory<typeof WrappedInput> = (args) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <div style={{ margin: '4rem' }}>
        <WrappedInput {...args} />
      </div>
    </FormProvider>
  );
};

export const FullWrappedInput = Template.bind({});
FullWrappedInput.args = {
  id: 'example',
  label: 'Complete Input',
  placeholder: 'placeholder',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  number: false,
  address: false,
  long: false,
  full: false,
  warning: undefined,
  error: undefined,
  success: undefined,
};
