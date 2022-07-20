import React from 'react';
import { Link } from 'react-router-dom';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import styled from 'styled-components';
import { breakpoints, H5, ParLg, ParMd, Dropdown, Bold } from '@daohaus/ui';
import { Avatar, Button, Link as ExternalLink } from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';
import { SELF_ID_URL } from '../constants';
import { BiChevronDown } from 'react-icons/bi';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StyledAvatar = styled(Avatar)`
  display: none;

  @media (min-width: ${breakpoints.xs}) {
    display: flex;
  }
`;

const NameContainer = styled.div`
  align-items: center;
  gap: 1rem;
  display: none;

  @media (min-width: ${breakpoints.xs}) {
    display: flex;
  }
`;

const StyledChevron = styled(BiChevronDown)`
  fill: white;
  :hover {
    fill: white;
  }
`;

const StyledParMd = styled(ParMd)`
  padding: 1.2rem 0.5rem 1.2rem 1.2rem;
`;

const StyledButton = styled(Button)`
  background-color: ${indigoDark.indigo3};
  color: white;
  border-radius: 0.4rem;
  border: none;
  width: 100%;
  height: 4rem;
  font-size: 1.6rem;
  padding: 0.8rem;

  :hover {
    background-color: ${indigoDark.indigo5};
    color: white;
    border: none;
  }
  :focus {
    background-color: ${indigoDark.indigo5};
    color: white;
    border: none;
  }
  :active {
    background-color: ${indigoDark.indigo5};
    color: white;
    border: none;
  }
  :disabled {
    background-color: ${indigoDark.indigo1};
    color: white;
    border: none;
  }

  @media (min-width: ${breakpoints.xs}) {
    height: 5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  :hover {
    text-decoration: underline;
    color: ${(props) => props.theme.button.primary.hoverBg};
  }
`;

const StyledExternalLink = styled(ExternalLink)`
  padding-right: 1.2rem;
`;

export const HeaderProfile = () => {
  const { profile, address } = useHausConnect();
  return (
    <ProfileContainer>
      <StyledAvatar src={profile?.image || ''} size="lg" alt="profile image" />
      <div>
        <NameContainer>
          {profile?.name && <H5>{profile?.name || ''}</H5>}
          {profile?.emoji && (
            <ParLg as="span" role="img" aria-label="profile emoji">
              {profile?.emoji || ''}
            </ParLg>
          )}
        </NameContainer>
      </div>
      <Dropdown
        bg={indigoDark.indigo3}
        trigger={<StyledButton IconRight={StyledChevron}>Profile</StyledButton>}
        items={[
          {
            type: 'clickable',
            content: (
              <StyledExternalLink href={SELF_ID_URL}>
                <StyledParMd>Edit SELF_ID</StyledParMd>
              </StyledExternalLink>
            ),
          },
          {
            type: 'clickable',
            content: (
              <StyledLink to={`/profile/${address}`}>
                <StyledParMd>View Public</StyledParMd>
              </StyledLink>
            ),
          },
        ]}
      />
    </ProfileContainer>
  );
};

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

export const Profile = () => {
  const { profile } = useHausConnect();
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
