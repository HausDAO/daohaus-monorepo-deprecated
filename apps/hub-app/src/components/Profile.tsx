import React, { useEffect, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { BiCopy } from 'react-icons/bi';
import { H5, H6, Underline, ParLg, ParMd } from '@daohaus/ui';
import { AvatarLg } from '../components/Avatar';
import { networks } from '../constants';
import { Haus } from '@daohaus/dao-data';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6rem;
`;
const StyledAnchor = styled.a`
  text-decoration: none;
  color: white;
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

const Profile = () => {
  const [profile, setProfile] = useState({
    image: '',
    name: '',
    description: '',
    emoji: '',
    background: '',
  });
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(`stub.eth`);
  };

  const getProfile = async () => {
    const haus = Haus.create(networks);
    try {
      const profile = await haus.profile.get(
        '0xEAC5F0d4A9a45E1f9FdD0e7e2882e9f60E301156'
      );
      if (profile) {
        setProfile({
          name: profile.name || '',
          image: profile.image || '',
          description: profile.description || '',
          emoji: profile.emoji || '',
          background: profile.image || '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ProfileContainer>
      <AvatarLg src={profile.image} alt="profile image" />
      <div>
        <NameContainer>
          <H5>{profile.name}</H5>
          <ParLg as="span" role="img" aria-label="profile emoji">
            {profile.emoji}
          </ParLg>
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
        <Underline>
          <ParMd>Edit Preferences</ParMd>
        </Underline>
      </div>
    </ProfileContainer>
  );
};

export default Profile;
