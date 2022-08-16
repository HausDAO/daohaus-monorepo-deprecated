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
  useMembership,
  TMembers,
} from '../contexts/DaoContext';
import { MembersOverview } from '../components/MembersOverview';
import { ProfileLink } from '../components/ProfileLink';
import { DaoTable } from '../components/DaohausTable';
import { useMemo } from 'react';
import { Column, Row } from 'react-table';
import {
  formatDateFromSeconds,
  formatDateTimeFromSeconds,
  fromWei,
  votingPowerPercentage,
} from '@daohaus/common-utilities';

const MemberContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export type MembersTableType = TMembers[number];

export function Members() {
  const { dao } = useDao();
  const { members } = useMembers();
  const { membership } = useMembership();

  console.log('members', members);
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
        Header: 'Join Date',
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) => {
          return <div>{formatDateFromSeconds(value)}</div>;
        },
      },
      {
        Header: 'Power',
        accessor: 'delegateShares',
        Cell: ({ value }: { value: string }) => {
          return (
            <div>{votingPowerPercentage(dao?.totalShares || '0', value)}</div>
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
        Header: 'Delegated To',
        accessor: 'delegatingTo',
        Cell: ({
          value,
          row,
        }: {
          value: string;
          row: Row<MembersTableType>;
        }) => {
          return (
            <div>{value === row.original.memberAddress ? '--' : value}</div>
          );
        },
      },
    ],
    [dao]
  );

  return (
    <SingleColumnLayout
      title="Members"
      actions={
        membership && <ProfileLink memberAddress={membership.memberAddress} />
      }
    >
      <MemberContainer>
        {dao && members && (
          <>
            <MembersOverview dao={dao} />
            {tableData && columns && (
              <DaoTable tableData={tableData} columns={columns} />
            )}
          </>
        )}
      </MemberContainer>
    </SingleColumnLayout>
  );
}

export default Members;
