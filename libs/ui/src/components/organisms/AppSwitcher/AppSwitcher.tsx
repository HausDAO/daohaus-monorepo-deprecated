import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { Dropdown, DropdownMenuItem, DropdownButton } from '../../molecules';
import { AppSwitcherTrigger } from './AppSwitcher.styles';

import { ReactComponent as Daohaus } from '../../../assets/Daohaus.svg';
import { ReactComponent as Docs } from '../../../assets/Docs.svg';
import { ReactComponent as Hub } from '../../../assets/Hub.svg';
import { ReactComponent as Summoner } from '../../../assets/Summoner.svg';

type AppSwitcherProps = {
  currentApp: string;
  spacing?: string;
  minWidth?: string;
  menuBg?: string;
  className?: string;
};

const hausApps = {
  summoner: {
    name: 'Summoner',
    url: 'https://summon.daohaus.fun/',
    icon: Summoner,
  },
  hub: {
    name: 'Hub',
    url: 'https://hub.daohaus.fun/',
    icon: Hub,
  },
  docs: {
    name: 'Docs',
    url: 'https://storybook.daohaus.fun/',
    icon: Docs,
  },
  daohaus: {
    name: 'DAOHaus',
    url: 'https://daohaus.club/',
    icon: Daohaus,
  },
};

type hausAppTypes = typeof hausApps;

function getCurrentApp<T extends keyof hausAppTypes>(currentApp: T) {
  return hausApps[currentApp];
}

function getDropdownApps<T extends keyof hausAppTypes>(currentApp: T) {
  delete hausApps[currentApp];
  return Object.values(hausApps).map((app, index) => (
    <DropdownMenuItem key={index} asChild>
      <DropdownButton fullWidth leftAlign IconLeft={app.icon}>
        {app.name}
      </DropdownButton>
    </DropdownMenuItem>
  ));
}

export const AppSwitcher = ({
  className,
  currentApp,
  minWidth = '17.8rem',
}: AppSwitcherProps) => {
  const trigger = getCurrentApp(currentApp as keyof hausAppTypes);
  const dropdownApps = getDropdownApps(currentApp as keyof hausAppTypes);
  return (
    <Dropdown
      className={className}
      menuMinWidth={minWidth}
      trigger={
        <AppSwitcherTrigger
          minWidth={minWidth}
          IconLeft={trigger.icon}
          IconRight={RiArrowDropDownLine}
        >
          {trigger.name}
        </AppSwitcherTrigger>
      }
    >
      {dropdownApps}
    </Dropdown>
  );
};
