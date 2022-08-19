import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CollapsibleCard, CollapsibleContent } from './CollapsibleCard';

export default {
  title: 'Molecules/CollapsibleCard',
  component: CollapsibleCard,
} as ComponentMeta<typeof CollapsibleCard>;

const Template: ComponentStory<typeof CollapsibleCard> = (args) => {
  return <CollapsibleCard {...args}>{args.children}</CollapsibleCard>;
};

export const CardMolecule = Template.bind({});

CardMolecule.args = {
  children: (
    <div>
      <p>Content in a Card</p>
    </div>
  ),
};
