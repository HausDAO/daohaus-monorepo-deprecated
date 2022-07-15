import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SubNav } from './SubNav';

export default {
  title: 'Layouts/SubNav',
  component: SubNav,
} as ComponentMeta<typeof SubNav>;

const Template: ComponentStory<typeof SubNav> = (args) => <SubNav {...args} />;

export const SubNavExample = Template.bind({});
SubNavExample.args = {
  navLinks: [
    { label: 'Home', href: '/home' },
    { label: 'Proposals', href: '/proposals' },
    { label: 'Vaults', href: '/vaults' },
    { label: 'Members', href: '/members' },
  ],
};
