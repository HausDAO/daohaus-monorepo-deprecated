import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Toast } from './Toast';

export default {
  title: 'Molecules/Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const AtomToast = Template.bind({});

AtomToast.args = {
  // content: "Oh boy! It's content!",
};

export const SuccessToast = Template.bind({});
SuccessToast.args = {
  // content: 'Oh boy! Large Icons!',
};

export const ErrorToast = Template.bind({});
ErrorToast.args = {
  // content: "Oh-eeee! That's a custom icon!",
};
