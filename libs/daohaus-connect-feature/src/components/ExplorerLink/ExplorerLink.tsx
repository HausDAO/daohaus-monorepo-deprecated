import React, { useMemo } from 'react';
import { IconType } from 'react-icons/lib';
import { RiExternalLinkLine } from 'react-icons/ri';

import {
  generateExplorerLink,
  isValidNetwork,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { Link } from '@daohaus/ui';

import { useHausConnect } from '../../HausConnectContext';

type ExplorerLinkProps = {
  children?: React.ReactNode;
  chainId?: ValidNetwork;
  Icon?: IconType;
  address?: string;
  className?: string;
  type?: string;
};

export const ExplorerLink = ({
  children,
  chainId,
  address,
  Icon = RiExternalLinkLine,
  className,
  type,
}: ExplorerLinkProps) => {
  const { chainId: contextChainId } = useHausConnect();

  const explorerLink = useMemo(() => {
    if (chainId) {
      return generateExplorerLink({ chainId, address, type });
    }
    if (contextChainId && isValidNetwork(contextChainId)) {
      return generateExplorerLink({ chainId: contextChainId, address, type });
    }
    return '/';
  }, [contextChainId, chainId, address, type]);

  return (
    <Link
      href={explorerLink}
      className={className}
      rel="noopener noreferrer"
      linkType="external"
    >
      {children}
    </Link>
  );
};
