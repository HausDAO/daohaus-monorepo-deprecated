import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

import { ParXs } from '../../atoms/Typography';
import { AppSwitcher } from './AppSwitcher';
import { Button } from '../../atoms/Button/Button';

export default {
  title: 'Molecules/AppSwitcher',
  component: AppSwitcher,
} as ComponentMeta<typeof AppSwitcher>;

const Template: ComponentStory<typeof AppSwitcher> = (args) => (
  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
    <AppSwitcher {...args} />
  </div>
);

// const networkPanels = [
//   'Mainnet',
//   'Arbitrum',
//   'Celo',
//   'Gnosis',
//   'Optimism',
//   'Gnosis',
//   'Polygon',
//   'Kovan',
//   'Rinkeby',
// ].map((item, index) => (
// <DropdownMenuItem key={index} spacing="0.7rem">
//   <Button secondary fullWidth leftAlign>
//     {item}
//   </Button>
// </DropdownMenuItem>
// ));

export const FullDropdown = Template.bind({});

// FullDropdown.args = {
//   menuMinWidth: '26rem',
//   align: 'end',
//   trigger: (
//     <Button IconLeft={RiAlertLine} tertiary>
//       Network Unavailable
//     </Button>
//   ),
//   children: [
//     // <DropdownMenuLabel key={uuidv4()}>
//     //   <ParXs>Switch to available network</ParXs>
//     // </DropdownMenuLabel>,
//     ...networkPanels,
//   ],
// };
