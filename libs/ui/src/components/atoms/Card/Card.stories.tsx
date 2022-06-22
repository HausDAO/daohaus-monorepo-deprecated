import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from './Card';

export default {
  title: 'Atoms/Card',
  component: Card,
} as ComponentMeta<typeof Card>;
const Template: ComponentStory<typeof Card> = (args) => (
  <Card>{args.children}</Card>
);

export const AtomCard = Template.bind({});

AtomCard.args = {
  children: <p>Content in a Card</p>,
};

export const CardWithIcon = Template.bind({});
CardWithIcon.args = {
  children: <p>Test</p>,
};
