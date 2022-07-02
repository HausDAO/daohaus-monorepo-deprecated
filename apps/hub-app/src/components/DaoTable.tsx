import React from 'react';
import { ITransformedMembership } from '@daohaus/dao-data';
import { useTable, Column } from 'react-table';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';
import { Avatar } from '@daohaus/ui';
import { BiGhost } from 'react-icons/bi';

// interface DaoData {
//   name: string;
//   activeProposalCount: number | string;
//   activeMemberCount: string;
//   votingPower: number;
//   networkId?: keyof Keychain;
//   delegate: string | undefined;
//   memberAddress?: string;
//   fiatTotal: number;
//   totalProposalCount?: string;
// }

interface IDaoTableData {
  // daoData: DaoData[];
  daoData: ITransformedMembership[];
}

const Table = styled.table`
  width: 100%;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const Th = styled.th`
  color: ${indigoDark.indigo11};
  border-bottom: 1px solid ${indigoDark.indigo5};
  padding: 0.5rem;
`;

const Tr = styled.tr``;

const Td = styled.td`
  text-align: center;
  padding: 1.5rem;
`;

const TBody = styled.tbody``;

const Highlight = styled.p`
  color: ${indigoDark.indigo9};
`;

const FirstHeader = styled.p`
  text-align: left;
  padding-left: 1.6rem;
`;

const FirstCell = styled.p`
  text-align: left;
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

export const DaoTable = ({ daoData }: IDaoTableData) => {
  const tableData = React.useMemo<ITransformedMembership[]>(
    () =>
      daoData.map((dao: ITransformedMembership) => ({
        name: dao.name,
        activeProposalCount: dao.activeProposalCount,
        fiatTotal: dao.fiatTotal,
        activeMemberCount: dao.activeMemberCount,
        votingPower: dao.votingPower,
        networkId: dao.networkId,
        delegate: dao.delegate === undefined ? 'No Delegate' : dao.delegate,
        memberAddress: dao.memberAddress,
        safeAddress: dao.safeAddress,
        dao: dao.dao,
        isDelegate: dao.isDelegate,
        totalProposalCount: dao.totalProposalCount,
        contractType: dao.contractType,
      })),
    [daoData]
  );

  const exampleColumns = React.useMemo<Column<ITransformedMembership>[]>(
    () => [
      {
        accessor: 'name', // accessor is the "key" in the data
        Cell: ({ value }: { value: string | undefined }) => {
          return (
            <FirstCell>
              <Avatar size="sm" fallback={<BiGhost />} />
              {value}
            </FirstCell>
          );
        },
        Header: () => {
          return <FirstHeader>3 Daos</FirstHeader>;
        },
      },
      {
        Header: 'Active Proposals',
        accessor: 'activeProposalCount',
        Cell: ({ value }: { value: string | number }) => {
          return <Highlight>{value}</Highlight>;
        },
      },
      {
        Header: 'Vaults',
        accessor: 'fiatTotal',
      },
      {
        Header: 'Members',
        accessor: 'activeMemberCount',
      },
      {
        Header: 'Power',
        accessor: 'votingPower',
      },
      {
        Header: 'Network',
        accessor: 'networkId',
      },
      {
        Header: 'Delegate',
        accessor: 'delegate',
        Cell: ({ value }: { value: string | undefined }) => {
          return <Highlight>{value}</Highlight>;
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: exampleColumns,
      data: tableData,
    });

  return (
    <Table {...getTableProps}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <TBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
              })}
            </Tr>
          );
        })}
      </TBody>
    </Table>
  );
};
