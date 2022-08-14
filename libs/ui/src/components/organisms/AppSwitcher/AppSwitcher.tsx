import React from 'react';
import { IconType } from 'react-icons/lib';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { Dropdown, DropdownMenuItem, DropdownButton } from '../../molecules';
import { AppSwitcherTrigger } from './AppSwitcher.styles';

type DaoHauseApp = {
  name: string;
  url: string;
  icon: IconType;
};

type AppSwitcherProps = {
  currentApp: DaoHauseApp;
  apps: DaoHauseApp[];
  spacing?: string;
  minWidth?: string;
  menuBg?: string;
  className?: string;
};

const getApps = (apps: DaoHauseApp[]) => {
  return apps.map((app, index) => (
    <DropdownMenuItem key={index} asChild>
      <DropdownButton fullWidth leftAlign IconLeft={app.icon}>
        {app.name}
      </DropdownButton>
    </DropdownMenuItem>
  ));
};

export const AppSwitcher = ({
  className,
  apps,
  currentApp,
  minWidth = '17.8rem',
}: AppSwitcherProps) => {
  const formatedApps = getApps(apps);
  return (
    <Dropdown
      className={className}
      menuMinWidth={minWidth}
      trigger={
        <AppSwitcherTrigger
          minWidth={minWidth}
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
