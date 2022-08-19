import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';
import { BiChevronDown } from 'react-icons/bi';

import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import {
  breakpoints,
  H5,
  ParLg,
  ParMd,
  Dropdown,
  DropdownMenuItem,
  Bold,
  Avatar,
  Button,
  Link as ExternalLink,
} from '@daohaus/ui';
import { TMembership } from '../contexts/DaoContext';
import { AccountProfile } from '@daohaus/dao-data';

// import { LENS_PROFILE_URL } from '../constants';

const AvatarLarge = styled(Avatar)`
  height: 12rem;
  width: 12rem;
`;

const PContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
  background: ${indigoDark.indigo5};
  margin: 1.8rem;
  padding: 2.8rem;
  min-height: 30rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${indigoDark.indigo5};
`;

const ProfileNameContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProfileMetadataContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;

  @media (min-width: ${breakpoints.xs}) {
    flex-direction: row;
    align-items: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type ProfileProps = {
  profile: AccountProfile;
};

export const Profile = ({ profile }: ProfileProps) => {
  return (
    <PContainer>
      <ProfileMetadataContainer>
        <AvatarLarge src={profile?.image || ''} size="lg" alt="profile image" />
        <Container>
          <ProfileNameContainer>
            {profile?.name && <H5>{profile?.name || ''}</H5>}
            {profile?.emoji && (
              <ParLg as="span" role="img" aria-label="profile emoji">
                {profile?.emoji || ''}
              </ParLg>
            )}
          </ProfileNameContainer>
          {profile?.ens && (
            <ParMd as="span">
              <Bold>{profile?.ens}</Bold>
            </ParMd>
          )}
        </Container>
      </ProfileMetadataContainer>
      {profile?.description && <ParMd as="span">{profile?.description}</ParMd>}
    </PContainer>
  );
};
