import styled from 'styled-components';
import { Card, SingleColumnLayout, widthQuery } from '@daohaus/ui';

import { useDao } from '../contexts/DaoContext';
import { MetadataSettings } from '../components/MetadataSettings';

const SettingsContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Settings() {
  const { dao } = useDao();

  return (
    <SingleColumnLayout title="Settings">
      <SettingsContainer>
        {dao && <MetadataSettings dao={dao} />}
      </SettingsContainer>
    </SingleColumnLayout>
  );
}

export default Settings;
