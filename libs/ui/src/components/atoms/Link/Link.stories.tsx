import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiArrowDropDownLine, RiAlertLine } from 'react-icons/ri';

import { Link } from './Link';

export default {
  title: 'Atoms/Link',
  component: Link,
  decorators: [(ComponentStory) => <ComponentStory />],
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => {
  return <Link {...args} />;
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  href: 'https://daohaus.club/',
  linkType: 'external',
  children: 'External Link',
};

export const ExternalLinkWithIcon = Template.bind({});
ExternalLinkWithIcon.args = {
  href: 'https://daohaus.club/',
  linkType: 'external',
  children: 'External Link',
  Icon: RiAlertLine,
};

export const InternalLink = Template.bind({});
InternalLink.args = {
  href: '/Home',
  children: 'Internal Link',
};

export const InternalLinkWithIcon = Template.bind({});
InternalLinkWithIcon.args = {
  href: '/Home',
  children: 'Internal Link',
  Icon: RiArrowDropDownLine,
};
