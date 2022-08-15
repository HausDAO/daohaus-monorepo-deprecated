import React, { useMemo } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

import {
  generateExplorerLink,
  Keychain,
  truncateAddress,
  getNetworkName,
} from '@daohaus/common-utilities';
import { AccountProfile } from '@daohaus/dao-data';

import { ParMd } from '../../atoms';

import {
  Dropdown,
  DropdownLink,
  DropdownText,
  DropdownMenuItem,
  ProfileAvatar,
} from '../../molecules';
import { MemberCardTrigger } from './MemberCard.styles';
import { useToast } from '../../../hooks';

type MemberCardProps = {
  profile: AccountProfile;
  explorerNetworkId: keyof Keychain;
  minWidth?: string;
  menuBg?: string;
  className?: string;
};

export const MemberCard = ({
  className,
  profile,
  explorerNetworkId,
  minWidth = '17.8rem',
}: MemberCardProps) => {
  const { successToast } = useToast();

  // Memo
  const networkName = getNetworkName(explorerNetworkId);

  const explorerLink = useMemo(() => {
    if (explorerNetworkId) {
      return generateExplorerLink({
        chainId: explorerNetworkId,
        address: profile.address,
        type: 'address',
      });
    }
  }, [profile, explorerNetworkId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${profile.address}`);
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
          <ProfileAvatar address={profile.address} image={profile.image} />
          {(profile.name || profile.ens) && (
            <ParMd>{profile.name ? profile.name : profile.ens}</ParMd>
          )}
          {!profile.name && !profile.ens && (
            <ParMd>{truncateAddress(profile.address)}</ParMd>
          )}
        </MemberCardTrigger>
      }
    >
      <DropdownMenuItem>
        <DropdownLink href={`/profile/${profile.address}`}>
          <ParMd>View Profile</ParMd>
        </DropdownLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DropdownLink href={explorerLink} linkType="external">
          <ParMd>{networkName}</ParMd>
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
