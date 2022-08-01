import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '../../atoms';
import { MainLayout } from '../MainLayout';
import { SingleColumnLayout } from './SingleColumnLayout';

export default {
  title: 'Layouts/SingleColumnLayout',
  component: SingleColumnLayout,
} as ComponentMeta<typeof SingleColumnLayout>;

const Template: ComponentStory<typeof SingleColumnLayout> = (args) => (
  <MainLayout>
    <SingleColumnLayout {...args} />
  </MainLayout>
);

export const BaseSingleColumnLayout = Template.bind({});

BaseSingleColumnLayout.args = {
  title: 'Single Column Layout',
};

export const WithSubtitleDescription = Template.bind({});

WithSubtitleDescription.args = {
  title: 'Single Column Layout',
  subtitle: 'With Subtitle',
  description:
    'With Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod ultricies mauris tincidunt dapibus.',
};

export const WithActions = Template.bind({});

WithActions.args = {
  title: 'Single Column Layout',
  actions: [<Button>Action 1</Button>, <Button secondary>Action 2</Button>],
};
