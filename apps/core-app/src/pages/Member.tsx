import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  DataIndicator,
  H4,
  Icon,
  ParMd,
  SingleColumnLayout,
  Spinner,
  useToast,
  widthQuery,
} from '@daohaus/ui';
import { formatValueTo, fromWei, Keychain } from '@daohaus/common-utilities';

import { useDao } from '../contexts/DaoContext';
import { loadMember } from '../utils/dataFetchHelpers';
import { FindMemberQuery } from '@daohaus/dao-data';
import { indigoDark } from '@radix-ui/colors';
import { BsShareFill, BsArrowLeft } from 'react-icons/bs';

const OverviewCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

// const TokensCard = styled(OverviewCard)`
//   padding: 2.4rem;
// `;

// const DataGrid = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 100%;
//   align-content: space-between;
//   div {
//     padding: 2rem 0;
//     width: 19.7rem;

//     @media ${widthQuery.sm} {
//       min-width: 100%;
//     }
//   }
// `;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledArrowLeft = styled(BsArrowLeft)`
  height: 1.6rem;
  width: 1.6rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 64rem;
  margin-bottom: 3rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Member() {
  const { daochain, daoid, memberAddress } = useParams();
  const { dao } = useDao();
  const [currentMember, setCurrentMember] = useState<
    FindMemberQuery['member'] | undefined
  >();
  const [currentMemberLoading, setCurrentMemberLoading] =
    useState<boolean>(false);
  const { successToast } = useToast();

  console.log('currentMember', dao);

  useEffect(() => {
    let shouldUpdate = true;
    if (daochain && daoid && memberAddress) {
      loadMember({
        daoid,
        daochain: daochain as keyof Keychain,
        address: memberAddress,
        setMember: setCurrentMember,
        setMemberLoading: setCurrentMemberLoading,
        shouldUpdate,
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, memberAddress]);

  const handleOnClick = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    successToast({
      title: 'URL copied to clipboard',
    });
  };

  return (
    <SingleColumnLayout title="Member Profile">
      {currentMemberLoading && <Spinner />}
      {currentMember && (
        <>
          <ButtonsContainer>
            <StyledLink to={`/molochv3/${daochain}/${daoid}/members`}>
              {/* <Icon>
                <StyledArrowLeft />
              </Icon>
              <ParMd>MEMBERS</ParMd> */}
              <Button IconLeft={StyledArrowLeft} tertiary>
                MEMBERS
              </Button>
            </StyledLink>
            <Button IconLeft={BsShareFill} onClick={handleOnClick}>
              Share Profile
            </Button>
          </ButtonsContainer>
          <OverviewCard>
            {/* <DataGrid>
              <DataIndicator
                label="Vault Total"
                data={formatValueTo({
                  value: dao.fiatTotal,
                  decimals: 2,
                  format: 'currencyShort',
                })}
              />
              <DataIndicator label="Members" data={dao.activeMemberCount} />
              <DataIndicator
                label="Active Proposals"
                data={dao.proposalCount}
              />
            </DataGrid> */}
          </OverviewCard>
        </>
      )}
    </SingleColumnLayout>
  );
}

export default Member;
