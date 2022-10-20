import { Button, Link } from '@daohaus/ui';
import { useParams } from 'react-router-dom';

type ProfileLinkProps = {
  memberAddress: string;
  sm?: boolean;
  lg?: boolean;
  buttonText?: string;
};

export const ProfileLink = ({
  memberAddress,
  sm = false,
  lg = false,
  buttonText = 'Profile',
}: ProfileLinkProps) => {
  const { daoid, daochain } = useParams();

  return (
    <Link href={`/molochv3/${daochain}/${daoid}/members/${memberAddress}`}>
      <Button sm={sm} lg={lg}>
        {buttonText}
      </Button>
    </Link>
  );
};
