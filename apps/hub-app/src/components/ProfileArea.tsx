import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';
import { BodyNav } from '../components/BodyNav';
import { HeaderProfile } from '../components/Profile';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';

const ProfileContainer = styled.div`
  grid-area: profile;
  display: flex;
  gap: 2.6rem;
  background: ${indigoDark.indigo2};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProfileArea = () => {
  const { isProfileLoading, isConnected } = useHausConnect();
  return (
    <ProfileContainer>
      <BodyNav />
      {isConnected && !isProfileLoading && <HeaderProfile />}
    </ProfileContainer>
  );
};

export default ProfileArea;
