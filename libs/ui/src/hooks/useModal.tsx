import React, { useContext } from 'react';
import { HausThemeContext } from '../theme';
import { ModalProps } from '../types/modal.types';

export const useModal = () => {
  const { setModal } = useContext(HausThemeContext);

  const defaultModal = (props: ModalProps): void => {
    setModal({ ...props });
  };

  return { setModal, defaultModal };
};
