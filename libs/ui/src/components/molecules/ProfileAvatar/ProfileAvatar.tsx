import { useMemo } from 'react';
import { Avatar } from '../../atoms';
import makeBlockie from 'ethereum-blockies-base64';
import styled from 'styled-components';

type ProfileAvatarProps = Parameters<typeof Avatar>[0] & {
  address?: string;
  image?: string;
};

export const ProfileAvatar = ({
  address,
  image,
  ...props
}: ProfileAvatarProps) => {
  const blockie = useMemo(() => {
    if (address) {
      return <BlockieImg src={makeBlockie(address)} alt="user avatar" />;
    }
<<<<<<< HEAD
    return;
=======
    return '?';
>>>>>>> 8419fec41ac52de3f681334067f642037f11f0bd
  }, [address]);

  return <Avatar {...props} src={image} fallback={blockie} />;
};
export const BlockieImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
