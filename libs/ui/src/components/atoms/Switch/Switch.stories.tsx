import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Switch } from './Switch';

export default {
  title: 'Atoms/Form/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const AtomSwitch = Template.bind({});

AtomSwitch.args = {
  fieldLabel: 'Default Unchecked Switch',
  defaultChecked: false,
};

export const AtomSwitchOn = Template.bind({});

AtomSwitchOn.args = {
  fieldLabel: 'Default Checked Switch',
  defaultChecked: true,
};

export const SwitchDisabled = Template.bind({});
SwitchDisabled.args = {
  fieldLabel: 'Disabled Unchecked Switch',
  disabled: true,
  defaultChecked: false,
};

export const SwitchDisabledOn = Template.bind({});
SwitchDisabledOn.args = {
  fieldLabel: 'Disabled Checked Switch',
  disabled: true,
  defaultChecked: true,
};
