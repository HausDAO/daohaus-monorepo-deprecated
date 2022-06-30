import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../atoms';

import { Toast } from './Toast';

export default {
  title: 'Molecules/Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = ({ ...args }) => {
  return <Toast {...args} />;
};
export const AtomToast = Template.bind({});

AtomToast.args = {
  title: 'Title goes here',
};

export const ToastNoLinks = Template.bind({});
ToastNoLinks.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
};

export const ErrorToast = Template.bind({});
ErrorToast.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  iconType: 'error',
  error: true,
  toastLinks: {
    leftLink: {
      path: 'https://daohaus.club/',
      text: 'DAO Haus',
    },
    rightLink: {
      path: 'https://daohaus.club/docs/',
      text: 'DAO Haus Docs',
    },
  },
};

export const WarningToast = Template.bind({});
WarningToast.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  iconType: 'warning',
  warning: true,
  toastLinks: {
    leftLink: {
      path: 'https://daohaus.club/',
      text: 'DAO Haus',
    },
    rightLink: {
      path: 'https://daohaus.club/docs/',
      text: 'DAO Haus Docs',
    },
  },
};
