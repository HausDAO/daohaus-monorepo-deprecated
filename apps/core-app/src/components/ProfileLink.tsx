import { Button, Link } from '@daohaus/ui';
import { useParams } from 'react-router-dom';

type ProfileLinkProps = {
  memberAddress: string;
  sm?: boolean;
  lg?: boolean;
  buttonText?: string;
  secondary?: boolean;
};

export const ProfileLink = ({
  memberAddress,
  sm = false,
  lg = false,
  buttonText = 'Profile',
  secondary = false,
}: ProfileLinkProps) => {
  const { daoid, daochain } = useParams();

  return (
    <Link href={`/molochv3/${daochain}/${daoid}/members/${memberAddress}`}>
      <Button sm={sm} lg={lg} secondary={secondary}>
        {buttonText}
      </Button>
    </Link>
  );
};
