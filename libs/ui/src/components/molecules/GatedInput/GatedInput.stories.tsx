import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GatedInput } from './GatedInput';
import { useFormContext } from 'react-hook-form';
import { H3, ParXs } from '../../atoms/Typography';
import { WrappedInput } from '../WrappedInput';
import { WrappedInputSelect } from '../WrappedInputSelect';
import { WrappedSelect } from '../WrappedSelect';
import { WrappedSwitch } from '../WrappedSwitch';
import { WrappedTextArea } from '../WrappedTextArea';

export default {
  title: 'Molecules/Form/GatedInput',
  component: GatedInput,
} as ComponentMeta<typeof GatedInput>;

const Template: ComponentStory<typeof GatedInput> = (args) => {
  const { watch } = useFormContext();
  const value = watch();

  return (
    <div style={{ margin: '4rem' }}>
      <GatedInput {...args} />
      <H3>{value[args.id] || 'Input text will appear here'}</H3>
    </div>
  );
};

const defautExplanationText = (
  <>
    <ParXs>Explanation paragraph #1</ParXs>
    <ParXs>Explanation paragraph #2</ParXs>
  </>
);

export const FullGatedInput = Template.bind({});
FullGatedInput.args = {
  gatedId: 'gatedInput',
  gateLabel: 'Gated Input',
  id: 'example',
  label: 'Input',
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
  input: WrappedInput,
  updateHelperMsg: (formValues) => `This is the new value: ${formValues['example']}`,
  children: defautExplanationText,
};

export const FullGatedInputSelect = Template.bind({});
FullGatedInputSelect.args = {
  gatedId: 'gatedInput',
  gateLabel: 'Gated Input',
  id: 'inputId',
  label: 'Wrapped Input Select',
  selectId: 'selectID',
  info: 'This is controlled by the info prop',
  options: [
    { value: `${3600 * 24}`, name: 'Days' },
    { value: `${3600}`, name: 'Hours' },
    { value: `${60}`, name: 'Minutes' },
  ],
  placeholder: 'placeholder',
  helperText: 'Test the action/controls',
  selectPlaceholder: '-period-',
  input: WrappedInputSelect,
  updateHelperMsg: (formValues) =>
    `This is the new value: ${formValues['selectID'] ? formValues['inputId'] * formValues['selectID'] : 0} seconds`,
  children: (
    <ParXs style={{marginTop: '5px'}}>
      The expiration Date includes Voting and Grace periods. Adjust the days or hours
      to update the expiration
    </ParXs>
  ),
};

export const FullGatedSelect = Template.bind({});
FullGatedSelect.args = {
  gatedId: 'gatedInput',
  gateLabel: 'Gated Input',
  id: 'example',
  label: 'Complete Select',
  placeholder: 'placeholder',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  options: [
    { value: 'selectValue1', name: 'Select Label 1' },
    { value: 'selectValue2', name: 'Select Label 2' },
  ],
  long: false,
  full: false,
  warning: undefined,
  error: undefined,
  input: WrappedSelect,
  updateHelperMsg: (formValues) => `This is the new value: ${formValues['example'] || ''}`,
  children: defautExplanationText,
};

export const FullGatedSwitch = Template.bind({});
FullGatedSwitch.args = {
  gatedId: 'gatedInput',
  gateLabel: 'Gated Input',
  id: 'exampleSwitch',
  label: 'Wrapped Switch',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  switches: [
    {
      id: 'exampleSwitch',
      defaultChecked: false,
      disabled: false,
      fieldLabel: 'Check this switch',
    },
  ],
  input: WrappedSwitch,
};

export const FullGatedTextArea = Template.bind({});
FullGatedTextArea.args = {
  gatedId: 'gatedInput',
  gateLabel: 'Gated Input',
  id: 'example',
  label: 'Complete TextArea',
  placeholder: 'Placeholder...',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  full: false,
  warning: undefined,
  error: undefined,
  success: undefined,
  input: WrappedTextArea,
  updateHelperMsg: (formValues) => `This is the new value: ${formValues['example'] || ''}`,
  children: defautExplanationText,
};
