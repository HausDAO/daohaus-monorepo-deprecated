import { ComponentMeta, ComponentStory } from '@storybook/react';
import InputLabel from './inputLabel';

export default {
  title: 'Atoms/Input',
  component: InputLabel,
} as ComponentMeta<typeof InputLabel>;

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <InputLabel {...args} />
);
