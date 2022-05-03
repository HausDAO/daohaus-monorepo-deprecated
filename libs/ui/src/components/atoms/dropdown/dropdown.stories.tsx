import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BiError } from 'react-icons/bi';
import Button from '../button/button';
import { ParXs } from '../typography';
import Dropdown, { DropdownItem } from './dropdown';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
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
].map((item) => ({
  type: 'clickable',
  content: (
    <Button secondary fullWidth leftAlign>
      {item}
    </Button>
  ),
})) as DropdownItem[];

export const FullDropdown = Template.bind({});

FullDropdown.args = {
  spacing: '0.7rem',
  trigger: (
    <Button icon={BiError} tertiary>
      Network Unavailable
    </Button>
  ),
  items: [
    { type: 'label', content: <ParXs>Switch to available network</ParXs> },
    ...networkPanels,
  ],
};
