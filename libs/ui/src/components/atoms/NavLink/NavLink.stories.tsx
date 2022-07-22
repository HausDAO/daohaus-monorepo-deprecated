import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { NavLink } from './NavLink';

export default {
  title: 'Atoms/SubNavLink',
  component: NavLink,
} as ComponentMeta<typeof NavLink>;

const Template: ComponentStory<typeof NavLink> = (args) => (
  <NavLink {...args} />
);

export const Unselected = Template.bind({});
Unselected.args = {
  children: 'Home',
};

export const Selected = Template.bind({});
Selected.args = {
  children: 'Home',
  selected: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Home',
  selected: false,
  Icon: RiArrowDropDownLine,
};
