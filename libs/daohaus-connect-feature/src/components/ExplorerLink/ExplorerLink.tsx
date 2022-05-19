import { TemporaryLink } from '@daohaus/ui';
import React from 'react';
import { useHausConnect } from '../../HausConnectContext';

export const ExplorerLink = ({ children }) => {
  const { chainId } = useHausConnect();

  return <TemporaryLink>{children}</TemporaryLink>;
};
