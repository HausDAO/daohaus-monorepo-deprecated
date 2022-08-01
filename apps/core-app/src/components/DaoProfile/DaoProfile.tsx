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
} from '@daohaus/ui';
import { TDao } from '../../contexts/DaoContext';
import { useParams } from 'react-router-dom';
import { Keychain } from '@daohaus/common-utilities';
import { RiDiscordFill } from 'react-icons/ri';

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

export const DaoProfile = ({ dao }: { dao: TDao }) => {
  const { daochain } = useParams();
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
    </DaoProfileContainer>
  );
};
