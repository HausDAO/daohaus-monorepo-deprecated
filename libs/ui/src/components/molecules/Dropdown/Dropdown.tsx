import React from 'react';
import { v4 as uuid } from 'uuid';
import {
  DropdownMenuProps,
  DropdownMenuContentProps,
} from '@radix-ui/react-dropdown-menu';

import { Side, Align } from '@radix-ui/popper';

import { useTheme } from 'styled-components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownLabel,
} from './Dropdown.styles';

const DropdownContentOptions = {
  clickable: DropdownMenuItem,
  label: DropdownLabel,
};

export type DropdownItem = {
  type: keyof typeof DropdownContentOptions;
  content: React.ReactNode;
  key?: string;
};

type DropdownProps = DropdownMenuProps &
  DropdownMenuContentProps & {
    trigger: React.ReactNode;
    spacing?: string;
    menuWidth?: string;
    menuBg?: string;
    className?: string;
  };

export const Dropdown = ({
  defaultOpen,
  open,
  onOpenChange,
  modal,
  dir,
  trigger,
  side,
  sideOffset,
  align = 'start',
  alignOffset,
  avoidCollisions,
  className,
  menuWidth = 'fit-content',
  menuBg,
  children,
}: DropdownProps) => {
  const theme = useTheme();
  return (
    <DropdownMenu
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
      dir={dir}
    >
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        className={className}
        bg={menuBg || theme.dropdown.bg}
        width={menuWidth}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
