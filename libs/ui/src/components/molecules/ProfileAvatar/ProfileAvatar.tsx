import { useMemo } from 'react';
import { Avatar } from '../../atoms';
import makeBlockie from 'ethereum-blockies-base64';

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
  const pfp = useMemo(() => {
    if (image) {
      return image;
    }
    if (address) {
      return makeBlockie(address);
    }
    return;
  }, [image, address]);

  return <Avatar {...props} src={pfp} fallback={'?'} />;
};
