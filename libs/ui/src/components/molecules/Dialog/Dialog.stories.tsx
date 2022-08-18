import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '../../atoms';

import { Dialog, DialogContent, DialogTrigger } from './Dialog';

export default {
  title: 'Molecules/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof DialogContent> = ({
  title,
  children,
  ...args
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Fire Dialog</Button>
      </DialogTrigger>
      <DialogContent title={title} {...args}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export const MoleculeDialog = Template.bind({});

MoleculeDialog.args = {
  title: 'Title goes here',
};

export const MoleculeDialogDescription = Template.bind({});
MoleculeDialogDescription.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
};

export const MoleculeDialogOneButton = Template.bind({});
MoleculeDialogOneButton.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  leftButton: {
    onClick: () => alert('Left button clicked'),
    children: 'Left Button',
  },
};

export const MoleculeDialogBothButtons = Template.bind({});
MoleculeDialogBothButtons.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  alignButtons: 'start',
  leftButton: {
    onClick: () => alert('Left button clicked'),
    children: 'Left Button',
  },
  rightButton: {
    onClick: () => alert('Right button clicked'),
    children: 'Right Button',
  },
};
