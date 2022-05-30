import { RiAsterisk } from 'react-icons/ri';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const BaseIcon = Template.bind({});
BaseIcon.args = {
  label: 'Test Icon',
  children: <RiAsterisk />,
};
