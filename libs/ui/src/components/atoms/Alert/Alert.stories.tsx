import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

import { Alert } from './Alert';

export default {
  title: 'Atoms/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => {
  return <div></div>;
  // return <Alert {...args}>{args.children}</Alert>;
};

export const AtomAlert = Template.bind({});

AtomAlert.args = {
  children: <p>Content in a Alert</p>,
};

export const BlueAtomAlert = Template.bind({});
BlueAtomAlert.args = {
  AlertColor: 'blue',
  children: <p>Content in a Alert</p>,
};

export const VioletAtomAlert = Template.bind({});
VioletAtomAlert.args = {
  AlertColor: 'violet',
  children: <p>Content in a Alert</p>,
};

export const IconLeftAtomAlert = Template.bind({});
IconLeftAtomAlert.args = {
  AlertColor: 'violet',
  children: <p>Content in a Alert</p>,
  IconLeft: RiCloseLine,
};

export const IconRightAtomAlert = Template.bind({});
IconRightAtomAlert.args = {
  AlertColor: 'violet',
  children: <p>Content in a Alert</p>,
  IconRight: RiCheckLine,
};

export const IconBothAtomAlert = Template.bind({});
IconBothAtomAlert.args = {
  AlertColor: 'violet',
  children: <p>Content in a Alert</p>,
  IconLeft: RiCloseLine,
  IconRight: RiCheckLine,
};
