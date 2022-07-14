import { MemoryRouter } from 'react-router-dom';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Link } from './Link';

export default {
  title: 'Atoms/Link',
  component: Link,
  decorators: [
    (ComponentStory) => (
      <MemoryRouter>
        <ComponentStory />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => {
  return <Link {...args} />;
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  href: 'https://daohaus.club/',
  children: 'External Link',
};

export const InternalLink = Template.bind({});
InternalLink.args = {
  href: '/Home',
  children: 'Internal Link',
};
