import React, { useMemo } from 'react';

import {
  generateExplorerLink,
  Keychain,
  truncateAddress,
} from '@daohaus/common-utilities';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { ParMd } from '../../atoms';

import {
  Dropdown,
  DropdownLink,
  DropdownButton,
  DropdownText,
  DropdownMenuItem,
  ProfileAvatar,
} from '../../molecules';
import { MemberCardTrigger } from './MemberCard.styles';
import { useToast } from '../../../hooks';

type MemberCardProps = {
  ceramicProfile: {
    name?: string;
    ens?: string;
    address: string;
    image?: string;
  };
  explorerNetworkId?: keyof Keychain;
  minWidth?: string;
  menuBg?: string;
  className?: string;
};

export const MemberCard = ({
  className,
  ceramicProfile,
  explorerNetworkId,
  minWidth = '17.8rem',
}: MemberCardProps) => {
  const { successToast } = useToast();

  const explorerLink = useMemo(() => {
    if (explorerNetworkId) {
      return generateExplorerLink({
        chainId: explorerNetworkId,
        address: ceramicProfile.address,
        type: 'address',
      });
    }
  }, [ceramicProfile, explorerNetworkId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${ceramicProfile.address}`);
    successToast({
      title: 'Address copied to clipboard',
    });
  };

  return (
    <Dropdown
      className={className}
      align={'end'}
      trigger={
        <MemberCardTrigger
          avatar
          minWidth={minWidth}
          IconRight={RiArrowDropDownLine}
        >
          <ProfileAvatar
            address={ceramicProfile.address}
            image={ceramicProfile.image}
          />
          {(ceramicProfile.name || ceramicProfile.ens) && (
            <ParMd>
              {ceramicProfile.name ? ceramicProfile.name : ceramicProfile.ens}
            </ParMd>
          )}
          {!ceramicProfile.name && !ceramicProfile.ens && (
            <ParMd>{truncateAddress(ceramicProfile.address)}</ParMd>
          )}
        </MemberCardTrigger>
      }
    >
      <DropdownMenuItem>
        <DropdownLink href={`/profile/${ceramicProfile.address}`}>
          <ParMd>View Profile</ParMd>
        </DropdownLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DropdownLink href={explorerLink} linkType="external">
          <ParMd>Block Scout</ParMd>
        </DropdownLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DropdownText onClick={handleCopy}>
          <ParMd>Copy Address</ParMd>
        </DropdownText>
      </DropdownMenuItem>
    </Dropdown>
  );
};
