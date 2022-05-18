import { useMemo } from 'react';
import { Avatar } from '../../atoms';
import blockies from 'ethereum-blockies';

//  manually recreating an accountProfile type
// so that this could work independantly od DAOdata
type AccountProfile = {
  address: string;
  image?: string;
  [key: string]: string | null | undefined;
};

type ProfileAvatarProps = Parameters<typeof Avatar>[0] & {
  profile: AccountProfile;
};

export const ProfileAvatar = ({
  profile: { address, image },
  ...props
}: ProfileAvatarProps) => {
  const fallback = useMemo(() => {
    if (address) {
      return blockies.create({ seed: address });
    }
    return '?';
  }, [address]);

  return <Avatar {...props} src={image} fallback={fallback} />;
};
