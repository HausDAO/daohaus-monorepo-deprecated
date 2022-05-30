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
    { name: 'Select', value: 'option1' },
  ],
};
