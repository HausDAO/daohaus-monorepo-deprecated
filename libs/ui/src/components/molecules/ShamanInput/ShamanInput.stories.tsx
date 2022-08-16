import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ShamanInput } from './ShamanInput';
import { useFormContext } from 'react-hook-form';
import { H3 } from '../../atoms/Typography';

export default {
  title: 'Molecules/Form/ShamanInput',
  component: ShamanInput,
} as ComponentMeta<typeof ShamanInput>;

const Template: ComponentStory<typeof ShamanInput> = (args) => {
  const { watch } = useFormContext();
  const value = watch();

  return (
    <div style={{ margin: '4rem' }}>
      <ShamanInput {...args} />
      <H3>{value[args.id] || 'Input text will appear here'}</H3>
    </div>
  );
};

export const FullShamanInput = Template.bind({});
FullShamanInput.args = {
  id: 'example',
  label: 'Shaman Input',
  placeholder: 'Shaman permissions',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  address: false,
  long: false,
  full: false,
  warning: undefined,
  error: undefined,
  success: undefined,
};
