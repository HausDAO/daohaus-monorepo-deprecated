import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../../atoms/button/button';
import {
  ConnectWalletButton,
  WarningButton,
  WrongNetworkButton,
} from './DaoHausConnect';

export default {
  title: 'Recipes/DaoHausConnect/Buttons',
  component: Button,
} as ComponentMeta<typeof Button>;

export const ConnectWallet: ComponentStory<typeof Button> = () => (
  <ConnectWalletButton />
);

export const NetworkUnavailable: ComponentStory<typeof Button> = () => (
  <WarningButton>Network Unavailable</WarningButton>
);

export const WrongNetwork: ComponentStory<typeof Button> = () => (
  <WrongNetworkButton />
);
