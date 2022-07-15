import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SubNavLink } from './SubNavLink';

export default {
  title: 'Atoms/SubNavLink',
  component: SubNavLink,
} as ComponentMeta<typeof SubNavLink>;

const Template: ComponentStory<typeof SubNavLink> = (args) => (
  <SubNavLink {...args} />
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
