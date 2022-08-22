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
} from '@daohaus/ui';
import {
  formatDateFromSeconds,
  formatValueTo,
  fromWei,
  votingPowerPercentage,
} from '@daohaus/common-utilities';

import {
  useMembers,
  useDao,
  TMembers,
  useUserMembership,
  defaultDaoData,
} from '../contexts/DaoContext';
import { MembersOverview } from '../components/MembersOverview';
import { ProfileLink } from '../components/ProfileLink';
import { DaoTable } from '../components/DaohausTable';

const MemberContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  min-height: 20rem;
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
  const { userMembership } = useUserMembership();
  const isMobile = useBreakpoint(widthQuery.sm);

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
        Cell: ({ value }: { value: string }) => {
          return (
            <div className="hide-sm">
              {votingPowerPercentage(dao?.totalShares || '0', value)}
            </div>
          );
        },
      },
      {
        Header: () => {
          return <div>{dao?.shareTokenName}</div>;
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
          return <div>{dao?.lootTokenName}</div>;
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
          return <ProfileLink sm memberAddress={row.original.memberAddress} />;
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
        userMembership && (
          <ProfileLink
            memberAddress={userMembership.memberAddress}
            buttonText="My Profile"
          />
        )
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
