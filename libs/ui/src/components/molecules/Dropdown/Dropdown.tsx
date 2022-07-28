import React from 'react';
import { v4 as uuid } from 'uuid';
import { Side, Align } from '@radix-ui/popper';

import { useTheme } from 'styled-components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './Dropdown.styles';
import { DropdownLabel } from './DropdownExtras';

const DropdownContentOptions = {
  clickable: DropdownMenuItem,
  label: DropdownLabel,
};

export type DropdownItem = {
  type: keyof typeof DropdownContentOptions;
  content: React.ReactNode;
  key?: string;
};

type DropdownProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  bg?: string;
  spacing?: string;
  width?: string;
  align?: Align;
  alignOffset?: number;
  side?: Side;
  sideOffset?: number;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Dropdown = ({
  trigger,
  items,
  className,
  bg,
  spacing = '0',
  align = 'start',
  width = 'fit-content',
  open,
  onOpenChange,
}: DropdownProps) => {
  const theme = useTheme();
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={className}
        bg={bg || theme.dropdown.bg}
        align={align}
        width={width}
      >
        {items.map((item) => {
          if (item.type === 'clickable') {
            return (
              <DropdownMenuItem key={item.key || uuid()} spacing={spacing}>
                {item.content}
              </DropdownMenuItem>
            );
          }
          if (item.type === 'label') {
            return (
              <DropdownLabel key={item.key || uuid()}>
                {item.content}
              </DropdownLabel>
            );
<<<<<<< HEAD:libs/ui/src/components/atoms/Dropdown/Dropdown.tsx
          }
          return null;
=======
          } else return null;
>>>>>>> 62ecc8ea2ea18a76f416eb6fbc1fc254374393a5:libs/ui/src/components/molecules/Dropdown/Dropdown.tsx
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
