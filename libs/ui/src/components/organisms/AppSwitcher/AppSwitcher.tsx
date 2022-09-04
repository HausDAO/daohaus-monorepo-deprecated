import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { Dropdown, DropdownMenuItem, DropdownButton } from '../../molecules';
import { AppSwitcherTrigger } from './AppSwitcher.styles';

import DaohausSVG from '../../../assets/DaohausSVG';
import DocsSVG from '../../../assets/DocsSVG';
import HubSVG from '../../../assets/HubSVG';
import SummonerSVG from '../../../assets/SummonerSVG';

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
    icon: SummonerSVG,
  },
  hub: {
    name: 'Hub',
    url: 'https://hub.daohaus.fun/',
    icon: HubSVG,
  },
  docs: {
    name: 'Docs',
    url: 'https://storybook.daohaus.fun/',
    icon: DocsSVG,
  },
  daohaus: {
    name: 'DAOHaus',
    url: 'https://daohaus.club/',
    icon: DaohausSVG,
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
