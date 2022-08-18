import styled from 'styled-components';
import {
  SingleColumnLayout,
  Card,
  widthQuery,
  AddressDisplay,
} from '@daohaus/ui';

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
import { MouseEvent, useMemo } from 'react';
import { Column, HeaderGroup, Row } from 'react-table';
import {
  formatDateFromSeconds,
  fromWei,
  votingPowerPercentage,
} from '@daohaus/common-utilities';
import { TableHeaderCell } from '../components/SortableTableHeaderCell';

const MemberContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
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
  const { members, setMembersPaging, membersNextPaging, setMembersSort } =
    useMembers();
  const { userMembership } = useUserMembership();

  // console.log('membersSort', membersSort);
  console.log('membersNextPaging', membersNextPaging);

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
          return (
            // <TableHeaderCell
            //   className="hide-sm"
            //   label="Join Date"
            //   sortable
            //   orderBy={column.id}
            //   handleColumnSort={handleColumnSort}
            // />
            <div className="hide-sm">Join Date</div>
          );
        },
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) => {
          return <div className="hide-sm">{formatDateFromSeconds(value)}</div>;
        },
      },
      {
        Header: (props) => {
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
          return <div>{fromWei(value)}</div>;
        },
      },
      {
        Header: () => {
          return <div>{dao?.lootTokenName}</div>;
        },
        accessor: 'loot',
        Cell: ({ value }: { value: string }) => {
          return <div>{fromWei(value)}</div>;
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
        {dao && members && (
          <>
            <MembersOverview dao={dao} />
            {tableData && columns && (
              <DaoTable
                tableData={tableData}
                columns={columns}
                hasNextPaging={membersNextPaging !== undefined}
                handleLoadMore={handleLoadMore}
                handleColumnSort={handleColumnSort}
              />
            )}
          </>
        )}
      </MemberContainer>
    </SingleColumnLayout>
  );
}

export default Members;
