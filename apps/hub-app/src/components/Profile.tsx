import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { BiCopy } from 'react-icons/bi';
import { H5, H6, Underline, ParLg, ParMd } from '@daohaus/ui';
import Avatar from '../components/Avatar';

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
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(`stub.eth`);
  };

  return (
    <ProfileContainer>
      <Avatar />
      <div>
        <NameContainer>
          <H5>Example Username</H5>
          <ParLg as="span" role="img" aria-label="profile emoji">
            🤘
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
