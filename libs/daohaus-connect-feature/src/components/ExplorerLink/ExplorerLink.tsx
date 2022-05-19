import {
  generateExplorerLink,
  isValidNetwork,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { TemporaryLink } from '@daohaus/ui';
import React, { useMemo } from 'react';
import { IconType } from 'react-icons/lib';
import { RiExternalLinkLine } from 'react-icons/ri';
import styled from 'styled-components';
import { useHausConnect } from '../../HausConnectContext';

type ExplorerLinkProps = {
  children?: React.ReactNode;
  chainId?: ValidNetwork;
  Icon?: IconType;
  address?: string;
  className?: string;
};

export const ExplorerLink = ({
  children,
  chainId,
  address,
  Icon = RiExternalLinkLine,
  className,
}: ExplorerLinkProps) => {
  const { chainId: contextChainId } = useHausConnect();

  const explorerLink = useMemo(() => {
    if (chainId) {
      return generateExplorerLink({ chainId, address });
    }
    if (contextChainId && isValidNetwork(contextChainId)) {
      return generateExplorerLink({ chainId: contextChainId, address });
    }
    return '/';
  }, [contextChainId, chainId, address]);

  return (
    <TemporaryLink
      href={explorerLink}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WithIcon>
        <span className="link-text">{children}</span>
        <Icon />
      </WithIcon>
    </TemporaryLink>
  );
};

const WithIcon = styled.div`
  display: flex;
  align-items: center;
  .link-text {
    margin-right: 0.6rem;
  }
  svg {
    height: 1.2rem;
    width: 1.2rem;
  }
`;
