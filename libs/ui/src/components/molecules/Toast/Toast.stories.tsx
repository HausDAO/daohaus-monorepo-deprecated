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

export const SuccessToast = Template.bind({});
SuccessToast.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  toastType: 'success',
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
  open: true,
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  toastType: 'warning',
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

export const DangerToast = Template.bind({});
DangerToast.args = {
  open: true,
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  toastType: 'error',
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
