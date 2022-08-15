import React, { useContext } from 'react';
import { HausThemeContext } from '../theme';
import { ModalProps } from '../types/modal.types';

export const useModal = () => {
  const { setModal } = useContext(HausThemeContext);

  const defaultModal = ({ title, children, description }: ModalProps): void => {
    setModal({
      title,
      children,
      description,
    });
  };

  return { setModal, defaultModal };
};
