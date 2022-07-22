import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SubNav } from './SubNav';

export default {
  title: 'Molecules/SubNav',
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

export const SubNavWithDropdown = Template.bind({});
SubNavWithDropdown.args = {
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
