import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WrappedRadio } from './WrappedRadio';

export default {
  title: 'Molecules/Form/WrappedRadio',
  component: WrappedRadio,
} as ComponentMeta<typeof WrappedRadio>;

const Template: ComponentStory<typeof WrappedRadio> = (args) => {
  return (
    <div style={{ margin: '4rem' }}>
      <WrappedRadio {...args} />
    </div>
  );
};

export const FullWrappedRadio = Template.bind({});
FullWrappedRadio.args = {
  id: 'exampleRadio',
  label: 'Wrapped Radio',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  radioGroup: {
    id: 'exampleR',
    radios: [
      { id: 'g1r1', label: 'Value 1', value: 'v1' },
      { id: 'g1r2', label: 'Value 2', value: 'v2' },
      { id: 'g1r3', label: 'Value 3', value: 'v3' },
    ],
  },
};

export const SecondWrappedRadio = Template.bind({});
SecondWrappedRadio.args = {
  id: 'exampleRadio2',
  label: 'Wrapped Radio w/ Disabled Options',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  radioGroup: {
    id: 'exampleR2',
    name: 'random',
    defaultValue: 'v2',
    radios: [
      { id: 'g2r1', label: 'Value 1', value: 'v1' },
      { id: 'g2r2', label: 'Value 2', value: 'v2' },
      { id: 'g2r3', label: 'Value 3', value: 'v3' },
      { id: 'g2r4', label: 'Value 4', value: 'v4', disabled: true },
    ],
  },
};

export const DisabledWrappedRadio = Template.bind({});
DisabledWrappedRadio.args = {
  id: 'exampleRadio3',
  label: 'Wrapped Disabled Radio',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  radioGroup: {
    id: 'exampleR3',
    defaultValue: 'v1',
    radios: [
      { id: 'g3r1', label: 'Value 1', value: 'v1', disabled: true },
      { id: 'g3r2', label: 'Value 2', value: 'v2', disabled: true },
    ],
  },
};
