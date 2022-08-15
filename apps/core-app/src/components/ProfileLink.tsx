import { Button, Link } from '@daohaus/ui';
import { useParams } from 'react-router-dom';

type ProfileLinkProps = {
  memberAddress: string;
};

export const ProfileLink = ({ memberAddress }: ProfileLinkProps) => {
  const { daoid, daochain } = useParams();

  return (
    <Link href={`/molochv3/${daoid}/${daochain}/members/${memberAddress}`}>
      <Button>Profile</Button>
    </Link>
  );
};
