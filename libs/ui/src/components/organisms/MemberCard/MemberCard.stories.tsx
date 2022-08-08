import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemberCard } from './MemberCard';

export default {
  title: 'Organisms/MemberCard',
  component: MemberCard,
} as ComponentMeta<typeof MemberCard>;

const Template: ComponentStory<typeof MemberCard> = (args) => (
  <MemberCard {...args} />
);

export const MemberCardExample = Template.bind({});
MemberCardExample.args = {
  navLinks: [
    { label: 'Home', href: '/home' },
    { label: 'Proposals', href: '/proposals' },
    { label: 'Vaults', href: '/vaults' },
    { label: 'Members', href: '/members' },
  ],
};

export const MemberCardWithDropdown = Template.bind({});
MemberCardWithDropdown.args = {
  navLinks: [
    { label: 'Home', href: '/home' },
    { label: 'Proposals', href: '/proposals' },
    { label: 'Vaults', href: '/vaults' },
    { label: 'Members', href: '/members' },
  ],
  dropdownLinks: [
    { label: 'Dropdown Link 1', href: '/dropdown1' },
    { label: 'Dropdown Link 2', href: '/dropdown2' },
    { label: 'Dropdown Link 3', href: '/dropdown3' },
    { label: 'Dropdown Link 4', href: '/dropdown4' },
  ],
};
