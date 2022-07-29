import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Modal } from './Modal';

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = ({ ...args }) => {
  return <Modal {...args} />;
};
export const MoleculeModal = Template.bind({});

MoleculeModal.args = {
  title: 'Title goes here',
};

export const ModalDescription = Template.bind({});
ModalDescription.args = {
  title: 'Title goes here',
  description: 'Description Goes here and has more detail/text than the title',
};
