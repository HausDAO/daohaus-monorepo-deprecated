import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '../../atoms';

import { Modal, ModalContent, ModalTrigger } from './Modal';

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof ModalContent> = ({
  title,
  children,
  ...args
}) => {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Fire Modal</Button>
      </ModalTrigger>
      <ModalContent title={title} {...args}>
        {children}
      </ModalContent>
    </Modal>
  );
};
export const MoleculeModal = Template.bind({});

MoleculeModal.args = {
  title: 'Title goes here',
};

export const MoleculeModalDescription = Template.bind({});
MoleculeModalDescription.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
};

export const MoleculeModalOneButton = Template.bind({});
MoleculeModalOneButton.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
  leftButton: {
    onClick: () => alert('Left button clicked'),
    children: 'Left Button',
  },
};

export const MoleculeModalBothButtons = Template.bind({});
MoleculeModalBothButtons.args = {
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
