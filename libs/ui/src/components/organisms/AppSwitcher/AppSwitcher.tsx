import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IconType } from 'react-icons';

import { Dropdown, DropdownMenuItem, DropdownButton } from '../../molecules';
import { AppSwitcherTrigger } from './AppSwitcher.styles';

interface IApp {
  name: string;
  url: string;
  icon?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
}

export type AppSwitcherProps = {
  trigger: IApp;
  apps: IApp[];
  spacing?: string;
  width?: string;
  menuBg?: string;
  className?: string;
};

function getDropdownApps(apps: IApp[]) {
  return apps.map((app, index) => (
    <DropdownMenuItem key={index} asChild>
      <DropdownButton fullWidth leftAlign IconLeft={app.icon}>
        {app.name}
      </DropdownButton>
    </DropdownMenuItem>
  ));
}

export const AppSwitcher = ({
  className,
  trigger,
  apps,
  width = '17.8rem',
}: AppSwitcherProps) => {
  const dropdownApps = getDropdownApps(apps);

  return (
    <Dropdown
      className={className}
      menuMinWidth={width}
      trigger={
        <AppSwitcherTrigger
          width={width}
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
