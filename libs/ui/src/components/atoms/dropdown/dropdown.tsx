import {
  DropdownContainer,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdownStyle';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { useTheme } from 'styled-components';
import { DropdownLabel } from './dropdownExtras';

const DropdownContentOptions = {
  clickable: DropdownMenuItem,
  label: DropdownLabel,
};

export type DropdownItem = {
  type: keyof typeof DropdownContentOptions;
  content: React.ReactNode;
};
type DropdownProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  bg?: string;
  spacing?: string;
  width?: string;
  align?: 'start' | 'center' | 'end' | undefined;
};
// TODO aria
const Dropdown = ({
  trigger,
  items,
  bg = 'black',
  spacing = '0',
  align = 'start',
  width = '25rem',
}: DropdownProps) => {
  return (
    <DropdownContainer width={width}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownContentFactory
          items={items}
          bg={bg}
          spacing={spacing}
          align={align}
          width={width}
        />
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContentFactory = ({
  items,
  spacing,
  bg,
  align,
  width,
}: Omit<DropdownProps, 'trigger'>) => {
  const theme = useTheme();
  return (
    <DropdownMenuContent
      bg={bg || theme.dropdown.bg}
      align={align}
      width={width}
    >
      {items?.map((item) => {
        if (item.type === 'clickable') {
          return (
            <DropdownMenuItem key={uuid()} spacing={spacing}>
              {item.content}
            </DropdownMenuItem>
          );
        }
        if (item.type === 'label') {
          return <DropdownLabel key={uuid()}>{item.content}</DropdownLabel>;
        }
        return null;
      })}
    </DropdownMenuContent>
  );
};
