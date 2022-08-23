import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '../../atoms';

import { FieldAlert } from './FieldAlert';

export default {
  title: 'Molecules/Form/FieldAlert',
  component: FieldAlert,
} as ComponentMeta<typeof FieldAlert>;

const Template: ComponentStory<typeof FieldAlert> = (args) => {
  return <FieldAlert {...args}>{args.children}</FieldAlert>;
};

export const MoleculeFieldAlert = Template.bind({});

MoleculeFieldAlert.args = {
  message: 'This is a message with no children',
};

export const InfoMoleculeFieldAlert = Template.bind({});
InfoMoleculeFieldAlert.args = {
  message: 'This is a message with children',
  children: <Button>Click Me</Button>,
  className: 'info',
};

export const WarningMoleculeFieldAlert = Template.bind({});
WarningMoleculeFieldAlert.args = {
  message: 'This is a message with children',
  children: <Button>Click Me</Button>,
  className: 'warning',
};

export const ErrorMoleculeFieldAlert = Template.bind({});
ErrorMoleculeFieldAlert.args = {
  message: 'This is a message with children',
  children: <Button>Click Me</Button>,
  className: 'error',
};

export const FullMoleculeFieldAlert = Template.bind({});
FullMoleculeFieldAlert.args = {
  message: 'This is a message with children',
  children: <Button>Click Me</Button>,
  className: 'full',
};
