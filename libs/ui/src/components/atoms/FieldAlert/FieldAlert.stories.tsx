import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '../Button';

import { FieldAlert } from './FieldAlert';

export default {
  title: 'Atoms/FieldAlert',
  component: FieldAlert,
} as ComponentMeta<typeof FieldAlert>;

const Template: ComponentStory<typeof FieldAlert> = (args) => {
  return <FieldAlert {...args}>{args.children}</FieldAlert>;
};

export const AtomFieldAlert = Template.bind({});

AtomFieldAlert.args = {
  message: 'This is a message',
  action: <Button>Click Me</Button>,
};

export const InfoAtomFieldAlert = Template.bind({});
InfoAtomFieldAlert.args = {
  message: 'This is a message',
  action: <Button>Click Me</Button>,
  className: 'info',
};

export const WarningAtomFieldAlert = Template.bind({});
WarningAtomFieldAlert.args = {
  message: 'This is a message',
  action: <Button>Click Me</Button>,
  className: 'warning',
};

export const ErrorAtomFieldAlert = Template.bind({});
ErrorAtomFieldAlert.args = {
  message: 'This is a message',
  action: <Button>Click Me</Button>,
  className: 'error',
};

export const FullAtomFieldAlert = Template.bind({});
FullAtomFieldAlert.args = {
  message: 'This is a message',
  action: <Button>Click Me</Button>,
  className: 'full',
};
