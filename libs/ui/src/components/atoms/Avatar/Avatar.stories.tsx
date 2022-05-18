import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from './Avatar';

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const DefaultAvatar = Template.bind({});
DefaultAvatar.args = {
  src: 'ipfs://QmNS6662WGwQriDQUvYWB69E6EVyhAvTKfM6KcbkWdJMd8',
  alt: 'Jord',
};
