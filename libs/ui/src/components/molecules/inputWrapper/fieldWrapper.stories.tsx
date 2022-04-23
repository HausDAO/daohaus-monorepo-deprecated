import { ComponentMeta, ComponentStory } from '@storybook/react';
import FieldWrapper from './fieldWrapper';

export default {
  title: 'Molecules/FieldWrapper',
  component: FieldWrapper,
} as ComponentMeta<typeof FieldWrapper>;
const Template: ComponentStory<typeof FieldWrapper> = (args) => (
  <FieldWrapper {...args} />
);
export const LoneWrapper = Template.bind({});
