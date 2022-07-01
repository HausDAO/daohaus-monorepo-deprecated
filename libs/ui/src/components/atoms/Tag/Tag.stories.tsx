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
  tagColor: 'green',
  children: <p>Content in a Tag</p>,
};
