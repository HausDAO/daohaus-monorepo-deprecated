import React from 'react';
import { IconType } from 'react-icons/lib';
import {
  RiArrowDropDownLine,
  RiCommandLine,
  RiBookOpenLine,
} from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { Button } from '../../atoms';
import { Dropdown, DropdownMenuItem } from '../../molecules';
import { AppSwitcherTrigger } from './AppSwitcher.styles';

const mockData = [
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

const mockCurrentApp = {
  name: 'Summoner',
  url: 'https://summon.daohaus.fun/',
  icon: RiCommandLine,
};

type DaoHauseApp = {
  name: string;
  url: string;
  icon: IconType;
};

type AppSwitcherProps = {
  trigger: React.ReactNode;
  currentApp: DaoHauseApp;
  apps: DaoHauseApp[];
  spacing?: string;
  menuMinWidth?: string;
  menuBg?: string;
  className?: string;
};

const getApps = (apps: DaoHauseApp[]) => {
  return apps.map((app, index) => (
    <DropdownMenuItem key={index}>
      <Button secondary fullWidth leftAlign IconLeft={app.icon}>
        {app.name}
      </Button>
    </DropdownMenuItem>
  ));
};

export const AppSwitcher = ({
  apps = mockData,
  currentApp = mockCurrentApp,
  className,
}: AppSwitcherProps) => {
  const formatedApps = getApps(apps);
  return (
    <Dropdown
      menuMinWidth="17.8rem"
      trigger={
        <AppSwitcherTrigger
          secondary
          avatar
          IconLeft={currentApp.icon}
          IconRight={RiArrowDropDownLine}
        >
          {currentApp.name}
        </AppSwitcherTrigger>
      }
    >
      {formatedApps}
    </Dropdown>
  );
};
