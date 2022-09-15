import { MouseEvent, useMemo } from 'react';
import styled from 'styled-components';
import { Column, Row } from 'react-table';
import {
  SingleColumnLayout,
  Card,
  widthQuery,
  AddressDisplay,
  Spinner,
  useBreakpoint,
  Link,
  Button,
  ParMd,
  Divider,
  Tooltip,
} from '@daohaus/ui';
import {
  charLimit,
  formatDateFromSeconds,
  formatValueTo,
  fromWei,
  sharesDelegatedToMember,
  votingPowerPercentage,
} from '@daohaus/common-utilities';

import {
  useMembers,
  useDao,
  TMembers,
  useConnectedMembership,
  defaultDaoData,
} from '@daohaus/dao-context';
import { MembersOverview } from '../components/MembersOverview';
import { ProfileLink } from '../components/ProfileLink';
import { DaoTable } from '../components/DaohausTable';
import { useParams } from 'react-router-dom';
import { MemberProfileMenu } from '../components/MemberProfileMenu';

const MemberContainer = styled(Card)`
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  min-height: 20rem;
  width: 100%;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
  @media ${widthQuery.md} {
    .hide-sm {
      display: none;
    }
  }
`;

const StyledButtonLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export type MembersTableType = TMembers[number];

export function Members() {
  const { dao } = useDao();
  const {
    members,
    setMembersPaging,
    membersNextPaging,
    setMembersSort,
    setMembers,
  } = useMembers();
  const { connectedMembership } = useConnectedMembership();
  const isMobile = useBreakpoint(widthQuery.sm);
  const { daoid, daochain } = useParams();

  const tableData = useMemo(() => {
    return members;
  }, [members]);

  const columns = useMemo<Column<MembersTableType>[]>(
    () => [
      {
        Header: 'Member',
        accessor: 'memberAddress',
        Cell: ({ value }: { value: string }) => {
          return <AddressDisplay address={value} truncate />;
        },
      },
      {
        Header: () => {
          return <div className="hide-sm">Join Date</div>;
        },
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) => {
          return <div className="hide-sm">{formatDateFromSeconds(value)}</div>;
        },
      },
      {
        Header: () => {
          return <div className="hide-sm">Power</div>;
        },
        accessor: 'delegateShares',
        Cell: ({
          value,
          row,
        }: {
          value: string;
          row: Row<MembersTableType>;
        }) => {
          const delegatedShares = sharesDelegatedToMember(
            row.original.delegateShares,
            row.original.shares
          );
          return (
            <div className="hide-sm">
              {votingPowerPercentage(dao?.totalShares || '0', value)}{' '}
              {delegatedShares > 0 && (
                <Tooltip
                  content={`${formatValueTo({
                    value: fromWei(delegatedShares.toFixed()),
                    decimals: 2,
                    format: 'number',
                  })} shares are delegated to this member`}
                  side="bottom"
                />
              )}
            </div>
          );
        },
      },
      {
        Header: () => {
          return <div>{charLimit(dao?.shareTokenName, 6)}</div>;
        },
        accessor: 'shares',
        Cell: ({ value }: { value: string }) => {
          return (
            <div>
              {formatValueTo({
                value: fromWei(value),
                decimals: 2,
                format: 'number',
              })}
            </div>
          );
        },
      },
      {
        Header: () => {
          return <div>{charLimit(dao?.lootTokenName, 6)}</div>;
        },
        accessor: 'loot',
        Cell: ({ value }: { value: string }) => {
          return (
            <div>
              {formatValueTo({
                value: fromWei(value),
                decimals: 2,
                format: 'number',
              })}
            </div>
          );
        },
      },
      {
        Header: () => {
          return <div className="hide-sm">Delegated To</div>;
        },
        accessor: 'delegatingTo',
        Cell: ({
          value,
          row,
        }: {
          value: string;
          row: Row<MembersTableType>;
        }) => {
          return (
            <div className="hide-sm">
              {value === row.original.memberAddress ? (
                '--'
              ) : (
                <AddressDisplay address={value} truncate />
              )}
            </div>
          );
        },
      },
      {
        accessor: 'id',
        Cell: ({ row }: { row: Row<MembersTableType> }) => {
          return (
            <ActionContainer>
              <ProfileLink
                sm
                secondary
                memberAddress={row.original.memberAddress}
              />
              <MemberProfileMenu memberAddress={row.original.memberAddress} />
            </ActionContainer>
          );
        },
      },
    ],
    [dao]
  );

  // TODO: Move these into the context as new hooks:
  // - loadMoreMembers (adds on to current members list - this is default)
  // - loadNextPageMembers (replaces current list)
  // - sort/filter (replaces current list)
  const handleLoadMore = (event: MouseEvent<HTMLButtonElement>) => {
    setMembersPaging(membersNextPaging);
  };

  const handleColumnSort = (
    orderBy: string,
    orderDirection: 'asc' | 'desc'
  ) => {
    // TODO: how can we dynamically pass the proper order by here
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setMembersSort({ orderBy, orderDirection });
    setMembersPaging(defaultDaoData.membersPaging);
    setMembers(undefined);
  };

  return (
    <SingleColumnLayout
      title="Members"
      actions={
        <>
          <StyledButtonLink
            href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=ISSUE`}
          >
            <Button secondary>Add Member</Button>
          </StyledButtonLink>
          {connectedMembership && (
            <ProfileLink
              memberAddress={connectedMembership.memberAddress}
              buttonText="My Profile"
            />
          )}
        </>
      }
    >
      <MemberContainer>
        {dao && <MembersOverview dao={dao} />}
        {dao && members && tableData && columns ? (
          <DaoTable<MembersTableType>
            tableData={tableData}
            columns={columns}
            hasNextPaging={membersNextPaging !== undefined}
            handleLoadMore={handleLoadMore}
            handleColumnSort={handleColumnSort}
            sortableColumns={['createdAt', 'shares', 'loot', 'delegateShares']}
          />
        ) : (
          <Spinner size={isMobile ? '8rem' : '16rem'} padding="6rem" />
        )}
      </MemberContainer>
    </SingleColumnLayout>
  );
}

export default Members;
