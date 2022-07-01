import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Tag } from './Tag';

export default {
  title: 'Atoms/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => {
  return <Tag {...args}>{args.children}</Tag>;
};

export const AtomTag = Template.bind({});

AtomTag.args = {
  children: <p>Content in a Tag</p>,
};

export const BlueAtomTag = Template.bind({});
BlueAtomTag.args = {
  tagColor: 'blue',
  children: <p>Content in a Tag</p>,
};

export const VioletAtomTag = Template.bind({});
VioletAtomTag.args = {
  tagColor: 'violet',
  children: <p>Content in a Tag</p>,
};
