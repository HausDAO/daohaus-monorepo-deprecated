import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { indigoDark } from '@radix-ui/colors';
import {
  breakpoints,
  Button,
  ParMd,
  Icon,
  Spinner,
  H5,
  ProfileAvatar,
} from '@daohaus/ui';
import { ITransformedMembership } from '@daohaus/dao-data';
import { BsShareFill, BsArrowLeft } from 'react-icons/bs';
import useDaoData from '../hooks/useDaoData';
import { Layout } from '../components/Layout';
import Header from '../components/Header';
import { Profile } from '../components/Profile';
import { Tag } from '../components/Tag';

const BodyNavArea = styled.div`
  grid-area: profile;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${breakpoints.xs}) {
    max-width: 58rem;
    justify-self: center;
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 1px solid ${indigoDark.indigo5};
  padding: 1.2rem 1.5rem 1.2rem 1.5rem;
  border-radius: 0.4rem;
  width: 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledPar = styled(ParMd)`
  color: ${indigoDark.indigo9};
`;

const StyledArrowLeft = styled(BsArrowLeft)`
  fill: ${indigoDark.indigo9};
  height: 1.6rem;
  width: 1.6rem;
`;

const Body = styled.div`
  grid-area: body;
  background: ${indigoDark.indigo2};
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.xs}) {
    max-width: 58rem;
    justify-self: center;
    width: 100%;
  }
`;

const StyledSpinner = styled(Spinner)`
  width: 0.8rem;

  @media (min-width: ${breakpoints.xs}) {
    width: 1.6rem;
  }
`;

const StyledListItem = styled.li`
  display: flex;
  gap: 1.2rem;
  list-style: none;
  align-items: center;
  font-size: 1.6rem;
  padding: 1.2rem 0;
`;

const StyledUnorderedList = styled.ul`
  padding: 1rem 2rem;
  border-top: 0.1rem solid ${indigoDark.indigo5};
`;

const DaoData = styled.div`
  display: flex;
  flex-direction: column;
`;

const DaoCountHeading = styled(H5)`
  padding-left: 2rem;
`;

const DaoColumn = ({ daoData }: { daoData: ITransformedMembership[] }) => {
  return (
    <StyledUnorderedList>
      {daoData.map((dao) => {
        return (
          <StyledListItem key={dao.dao}>
            <ProfileAvatar size="sm" address={dao.dao} />
            {dao.name}
            {dao.isDelegate && <Tag>Delegate</Tag>}
          </StyledListItem>
        );
      })}
    </StyledUnorderedList>
  );
};

const PublicProfilePage = () => {
  const { daoData, isLoadingDaoData } = useDaoData();
  const handleOnClick = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
  };

  return (
    <Layout>
      <Header />
      {isLoadingDaoData ? (
        <>
          <BodyNavArea>
            <StyledLink to="/">
              <Icon>
                <StyledArrowLeft />
              </Icon>
              <StyledPar>My Hub</StyledPar>
            </StyledLink>
            <Button IconLeft={BsShareFill} onClick={handleOnClick}>
              Share Profile
            </Button>
          </BodyNavArea>
          <Body
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StyledSpinner />
          </Body>
        </>
      ) : (
        <>
          <BodyNavArea>
            <StyledLink to="/">
              <Icon>
                <StyledArrowLeft />
              </Icon>
              <StyledPar>My Hub</StyledPar>
            </StyledLink>
            <Button IconLeft={BsShareFill} onClick={handleOnClick}>
              Share Profile
            </Button>
          </BodyNavArea>
          <Body>
            <Profile />
            {daoData.length < 1 ? (
              <DaoCountHeading>
                <ParMd>No DAO memberships found</ParMd>
              </DaoCountHeading>
            ) : (
              <DaoData>
                <DaoCountHeading>
                  {daoData.length} Total DAO{daoData.length === 1 ? '' : 's'}
                </DaoCountHeading>
                <DaoColumn daoData={daoData} />
              </DaoData>
            )}
          </Body>
        </>
      )}
    </Layout>
  );
};

export default PublicProfilePage;
