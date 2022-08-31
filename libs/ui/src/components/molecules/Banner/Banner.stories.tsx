import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Banner } from './Banner';

export default {
  title: 'Molecules/Banner',
  component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => {
  return <Banner>{args.children}</Banner>;
};

export const BaseBanner = Template.bind({});

BaseBanner.args = {
  children: <p>Content in a Card</p>,
};
