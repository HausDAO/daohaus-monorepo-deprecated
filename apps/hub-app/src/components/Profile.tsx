import React, { MouseEvent } from 'react';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import styled from 'styled-components';
import { BiCopy } from 'react-icons/bi';
import { H5, H6, Underline, ParLg, ParMd } from '@daohaus/ui';
import { Avatar, TemporaryLink } from '@daohaus/ui';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6rem;
  background: ;
`;
const StyledAnchor = styled(TemporaryLink)`
  text-decoration: none;
  color: white;
  :hover {
    text-decoration: underline;
    color: white;
  }
`;

const CopyIcon = styled(BiCopy)`
  min-width: 3.6rem;
  height: 3.6rem;
  padding: 0.9rem;
  font-size: 1.6rem;
  cursor: pointer;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarLg = styled(Avatar)`
  height: 16rem;
  width: 16rem;
`;

const Profile = () => {
  const { profile } = useHausConnect();
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(`stub.eth`);
  };

  return (
    <ProfileContainer>
      <AvatarLg src={profile?.image || ''} alt="profile image" />
      <div>
        <NameContainer>
          {profile?.name && <H5>{profile?.name || ''}</H5>}
          {profile?.emoji && (
            <ParLg as="span" role="img" aria-label="profile emoji">
              {profile?.emoji || ''}
            </ParLg>
          )}
        </NameContainer>
        <NameContainer>
          <H6>stub.eth</H6>
          <div onClick={handleClick}>
            <CopyIcon />
          </div>
        </NameContainer>
        <StyledAnchor
          href="https://clay.self.id/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Underline>
            <ParMd>Edit Self.id Profile</ParMd>
          </Underline>
        </StyledAnchor>
        <Underline>
          <ParMd>Edit ENS Profile</ParMd>
        </Underline>
      </div>
    </ProfileContainer>
  );
};

export default Profile;
