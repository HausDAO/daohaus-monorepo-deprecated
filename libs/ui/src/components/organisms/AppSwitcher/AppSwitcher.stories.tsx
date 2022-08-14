import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine, RiBookOpenLine, RiCommandLine } from 'react-icons/ri';

import { AppSwitcher } from './AppSwitcher';

export default {
  title: 'Molecules/AppSwitcher',
  component: AppSwitcher,
} as ComponentMeta<typeof AppSwitcher>;

const Template: ComponentStory<typeof AppSwitcher> = (args) => (
  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
    <AppSwitcher {...args} />
  </div>
);

const otherApps = [
  {
    name: 'Hub',
    url: 'https://hub.daohaus.fun/',
    icon: RiCommandLine,
  },
  {
    name: 'Docs',
    url: 'https://storybook.daohaus.fun/',
    icon: RiBookOpenLine,
  },
  {
    name: 'DAOHaus',
    url: 'https://daohaus.club/',
    icon: RiCommandLine,
  },
];

const currentApp = {
  name: 'Summoner',
  url: 'https://summon.daohaus.fun/',
  icon: RiCommandLine,
};

export const DaoHausAppSwitcher = Template.bind({});

DaoHausAppSwitcher.args = {
  currentApp: currentApp,
  apps: otherApps,
};
