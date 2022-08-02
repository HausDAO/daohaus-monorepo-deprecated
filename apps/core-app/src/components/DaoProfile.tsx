import styled from 'styled-components';

import {
  AddressDisplay,
  border,
  H4,
  ProfileAvatar,
  Theme,
  widthQuery,
  ParMd,
  Icon,
  Tag,
  Card,
  ParXs,
  Button,
  Link,
} from '@daohaus/ui';
import { TDao } from '../contexts/DaoContext';
import { useParams } from 'react-router-dom';
import { Keychain } from '@daohaus/common-utilities';
import { RiDiscordFill } from 'react-icons/ri';
import { useMemo } from 'react';

const DaoProfileContainer = styled.div`
  width: 100%;
  border-radius: ${border.radius};
  border: 1px ${({ theme }: { theme: Theme }) => theme.card.border} solid;
  background-color: ${({ theme }: { theme: Theme }) => theme.card.hoverBg};
  padding: 2.2rem;
  .avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.7rem;
    margin-bottom: 2.7rem;
    p {
      margin-right: auto;
    }
    @media ${widthQuery.xs} {
      flex-direction: column;
    }
    .links {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 18rem;
  height: 18rem;
`;

const MissingProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.3rem;
`;

export const DaoProfile = ({ dao }: { dao: TDao }) => {
  const { daochain, daoid } = useParams();

  const missingProfile = useMemo(() => {
    if (dao.description !== '' && dao.avatarImg !== '') return null;
    return (
      <MissingProfileCard>
        <ParXs>
          (ﾉ´ヮ`)ﾉ*: ･ﾟ Add some sparkle with a DAO avatar and description!
        </ParXs>
        <Link href={`/molochv3/${daochain}/${daoid}/settings`}>
          <Button>Go To Settings</Button>
        </Link>
      </MissingProfileCard>
    );
  }, [dao, daochain, daoid]);

  return (
    <DaoProfileContainer>
      <div className="avatar">
        <DaoProfileAvatar address={dao.id} />
        <div>
          <H4>{dao.name}</H4>
          <AddressDisplay
            address={dao.id}
            truncate
            copy
            explorerNetworkId={daochain as keyof Keychain}
          />
        </div>
      </div>
      {missingProfile && missingProfile}

      {!missingProfile && (
        <>
          <ParMd>
            The DAO Summit Conference will gather in the summer of 2022. DAO
            goverenace for all.{' '}
          </ParMd>
          <div className="links">
            <Icon>
              <RiDiscordFill />
            </Icon>
            Discord
          </div>
          <div className="links">
            {['Governance', 'Moloch v3'].map((tag) => {
              return (
                <Tag key={tag} tagColor="green">
                  {tag}
                </Tag>
              );
            })}
          </div>
        </>
      )}
    </DaoProfileContainer>
  );
};
