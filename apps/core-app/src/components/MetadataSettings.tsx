import styled from 'styled-components';
import {
  H3,
  ParMd,
  ProfileAvatar,
  DataIndicator,
  AddressDisplay,
  ParSm,
} from '@daohaus/ui';

import { TDao } from '../contexts/DaoContext';
import { TagList } from '../components/TagList';
import { useParams } from 'react-router-dom';
import { Keychain } from '@daohaus/common-utilities';

// putting this in place for when we bring in the action button
const MetaCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const MetaContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 3.4rem;
  max-width: 10rem;

  .contract {
    margin: 1.2rem 0;
  }
`;

const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 8.9rem;
  height: 8.9rem;
`;

type MetadataSettingsProps = {
  dao: TDao;
};

export const MetadataSettings = ({ dao }: MetadataSettingsProps) => {
  const { daochain } = useParams();

  return (
    <>
      <MetaCardHeader>
        <H3>Metadata</H3>
      </MetaCardHeader>
      <MetaContent>
        <div>
          <ParMd>Icon</ParMd>
          <DaoProfileAvatar address={dao.id} image={dao.avatarImg} />
        </div>
        <div>
          <DataIndicator label="DAO Name" data={dao.name} size="sm" />
          <DataIndicator label="Description" data={dao.description} size="sm" />
          {dao.tags && <TagList tags={dao.tags} />}
        </div>
        <div>
          <ParMd>DAO Contracts</ParMd>
          <div className="contract">
            <ParSm>Moloch V3</ParSm>
            <AddressDisplay
              address={dao.id}
              copy
              explorerNetworkId={daochain as keyof Keychain}
            />
          </div>
          <div className="contract">
            <ParSm>Gnosis Safe (Treasury)</ParSm>
            <AddressDisplay
              address={dao.safeAddress}
              copy
              explorerNetworkId={daochain as keyof Keychain}
            />
          </div>
          <div className="contract">
            <ParSm>Voting Stake Token</ParSm>
            <AddressDisplay
              address={dao.sharesAddress}
              copy
              explorerNetworkId={daochain as keyof Keychain}
            />
          </div>
          <div className="contract">
            <ParSm>Non-Voting Stake Token</ParSm>
            <AddressDisplay
              address={dao.lootAddress}
              copy
              explorerNetworkId={daochain as keyof Keychain}
            />
          </div>
        </div>
      </MetaContent>
    </>
  );
};
