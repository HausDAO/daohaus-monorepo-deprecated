import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SubNavLink } from './SubNavLink';

export default {
  title: 'Atoms/SubNavLink',
  component: SubNavLink,
} as ComponentMeta<typeof SubNavLink>;

export const Unselected = () => <SubNavLink>Home</SubNavLink>;
export const Selected = () => <SubNavLink selected={true}>Home</SubNavLink>;
