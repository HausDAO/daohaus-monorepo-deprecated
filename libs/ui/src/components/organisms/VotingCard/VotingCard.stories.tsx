import { ComponentMeta, ComponentStory } from '@storybook/react';
import { VotingCard } from './VotingCard';

export default {
  title: 'Organisms/VotingCard',
  component: VotingCard,
} as ComponentMeta<typeof VotingCard>;

const Template: ComponentStory<typeof VotingCard> = (args) => {
  return <VotingCard>{args.children}</VotingCard>;
};

export const BaseVotingCard = Template.bind({});

BaseVotingCard.args = {
  children: <p>Content in a Card</p>,
};
