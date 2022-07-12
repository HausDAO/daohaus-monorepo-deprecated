import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Layout,
  SideTopLeft,
  SideTopRight,
  SideProfileLeft,
  SideProfileRight,
} from '../components/Layout';
import Header from '../components/Header';
import { Profile } from '../components/Profile';
import { indigoDark } from '@radix-ui/colors';
import { breakpoints, Button, ParMd, Icon, Spinner, H5 } from '@daohaus/ui';
import { BsShareFill, BsArrowLeft } from 'react-icons/bs';
import useDaoData from '../hooks/useDaoData';
import { Avatar } from '@daohaus/ui';
import { BiGhost } from 'react-icons/bi';
import { ITransformedMembership } from '@daohaus/dao-data';

const BodyNavArea = styled.div`
  grid-area: profile;
  display: flex;
  background: ${indigoDark.indigo2};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${indigoDark.indigo5};

  @media (min-width: ${breakpoints.xs}) {
    padding: 1.5rem;
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
  gap: 1rem;
  list-style: none;
  align-items: center;
  font-size: 1.6rem;
`;

const StyledUnorderedList = styled.ul`
  padding: 1rem;
  border-top: 0.1rem solid ${indigoDark.indigo5};
`;

const DaoData = styled.div`
  display: flex;
  flex-direction: column;
`;

const DaoCountHeading = styled(H5)`
  padding-left: 1rem;
`;

const DaoColumn = ({ daoData }: { daoData: ITransformedMembership[] }) => {
  return (
    <StyledUnorderedList>
      {daoData.map((dao) => {
        return (
          <StyledListItem>
            <Avatar size="md" fallback={<BiGhost />} />
            {dao.name}
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
      <SideTopLeft />
      <SideTopRight />
      <SideProfileLeft />
      <SideProfileRight />
      <Header />
      {isLoadingDaoData ? (
        <Body
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <StyledSpinner />
        </Body>
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
                <ParMd>No Dao memberships found</ParMd>
              </DaoCountHeading>
            ) : (
              <DaoData>
                <DaoCountHeading>
                  {daoData.length} Total Dao {daoData.length === 1 ? '' : 's'}
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
