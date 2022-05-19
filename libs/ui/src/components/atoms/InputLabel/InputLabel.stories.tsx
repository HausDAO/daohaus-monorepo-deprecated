import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InputLabel } from './InputLabel';

export default {
  title: 'Atoms/Form/InputLabel',
  component: InputLabel,
} as ComponentMeta<typeof InputLabel>;

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <InputLabel {...args} />
);

export const BaseLabel = Template.bind({});

BaseLabel.args = {
  children: 'Input Label',
};
export const WithRequired = Template.bind({});

WithRequired.args = {
  children: 'With Required',
  required: true,
};
export const WithTooltip = Template.bind({});
WithTooltip.args = {
  children: 'With Tooltip',
  info: 'This should appear to the right of the input label',
};
export const WithEverything = Template.bind({});
WithEverything.args = {
  children: 'With Everything',
  required: true,
  info: 'This should include a tooltip and a required asterisk',
};
