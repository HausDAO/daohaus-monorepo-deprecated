import styled from 'styled-components';

import { SingleColumnLayout, Card, widthQuery } from '@daohaus/ui';
import { useMembers, useDao, useMembership } from '../contexts/DaoContext';
import { MembersOverview } from '../components/MembersOverview';
import { ProfileLink } from '../components/ProfileLink';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useMemo } from 'react';
import { getMemberFromMemberList } from '../utils/general';
import { RiContactsBookUploadLine } from 'react-icons/ri';

const MemmberContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Members() {
  const { members } = useMembers();
  const { dao } = useDao();
  const { membership } = useMembership();

  console.log('membership', membership);

  return (
    <SingleColumnLayout
      title="Members"
      actions={
        membership && <ProfileLink memberAddress={membership.memberAddress} />
      }
    >
      <MemmberContainer>
        {dao && members && <MembersOverview dao={dao} members={members} />}
      </MemmberContainer>
    </SingleColumnLayout>
  );
}

export default Members;
