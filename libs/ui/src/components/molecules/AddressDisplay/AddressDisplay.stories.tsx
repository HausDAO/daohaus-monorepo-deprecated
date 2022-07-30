import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AddressDisplay } from './AddressDisplay';

export default {
  title: 'Molecules/AddressDisplay',
  component: AddressDisplay,
} as ComponentMeta<typeof AddressDisplay>;

const Template: ComponentStory<typeof AddressDisplay> = (args) => (
  <AddressDisplay {...args} />
);
export const FullCase = Template.bind({});

FullCase.args = {
  address: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  explorerNetworkId: '0x5',
  copy: true,
};

// export const NoProfilePicCase = Template.bind({});

// NoProfilePicCase.args = {
//   image: undefined,
//   address: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
// };
// export const NoDataCase = Template.bind({});
// NoDataCase.args = {
//   image: undefined,
//   address: undefined,
// };
