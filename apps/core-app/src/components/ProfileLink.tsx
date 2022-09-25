import { Button, Link } from '@daohaus/ui';
import { ComponentProps } from 'react';
import { useParams } from 'react-router-dom';

type ProfileLinkProps = {
  memberAddress: string;
  buttonText?: string;
} & Partial<ComponentProps<typeof Button>>;

export const ProfileLink = ({
  memberAddress,
  buttonText = 'Profile',
  ...rest
}: ProfileLinkProps) => {
  const { daoid, daochain } = useParams();

  return (
    <Link href={`/molochv3/${daochain}/${daoid}/members/${memberAddress}`}>
      <Button {...rest}>{buttonText}</Button>
    </Link>
  );
};
