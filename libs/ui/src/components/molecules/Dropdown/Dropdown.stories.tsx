import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine } from 'react-icons/ri';

import { ParXs } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';
import { Dropdown } from './Dropdown';
import { DropdownMenuItem, DropdownLabel } from './Dropdown.styles';

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
  <DropdownMenuItem key={index} spacing="0.7rem">
    <Button secondary fullWidth leftAlign>
      {item}
    </Button>
  </DropdownMenuItem>
));

export const FullDropdown = Template.bind({});

FullDropdown.args = {
  menuMinWidth: '26rem',
  align: 'end',
  trigger: (
    <Button IconLeft={RiAlertLine} tertiary>
      Network Unavailable
    </Button>
  ),
  children: [
    <DropdownLabel key={'0x1'}>
      <ParXs>Switch to available network</ParXs>
    </DropdownLabel>,
    ...networkPanels,
  ],
};
