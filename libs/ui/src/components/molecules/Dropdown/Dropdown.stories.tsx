import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

import { ParXs } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';
import { Dropdown } from './Dropdown';
import { DropdownMenuItem, DropdownMenuLabel } from './Dropdown.styles';

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  subcomponents: { DropdownMenuItem },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
    <Dropdown {...args} />
  </div>
);

const networkPanels = [
  'Mainnet',
  'Arbitrum',
  'Celo',
  'Gnosis',
  'Optimism',
  'Gnosis',
  'Polygon',
  'Kovan',
  'Rinkeby',
].map((item, index) => (
  <DropdownMenuItem key={index}>
    <Button colorVariant="secondary" fullWidth>
      {item}
    </Button>
  </DropdownMenuItem>
));

export const FullDropdown = Template.bind({});

FullDropdown.args = {
  menuMinWidth: '26rem',
  align: 'end',
  trigger: (
    <Button IconLeft={RiAlertLine} variant="outline">
      Network Unavailable
    </Button>
  ),
  children: [
    <DropdownMenuLabel key={uuidv4()}>
      <ParXs>Switch to available network</ParXs>
    </DropdownMenuLabel>,
    ...networkPanels,
  ],
};
