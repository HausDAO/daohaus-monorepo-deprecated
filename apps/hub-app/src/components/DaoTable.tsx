import React from 'react';
import { ITransformedMembership } from '@daohaus/dao-data';
import { useTable, Column, UseTableRowProps } from 'react-table';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';
import { ProfileAvatar } from '@daohaus/ui';
import {
  readableNumber,
  toDollars,
  truncateAddress,
} from '@daohaus/common-utilities';
import { Tag } from './Tag';

interface IDaoTableData {
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

const FirstCell = styled.div`
  text-align: left;
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

type HubTableType = Omit<ITransformedMembership, 'name'> & {
  name: { name?: string; address: string };
};

export const DaoTable = ({ daoData }: IDaoTableData) => {
  const tableData = React.useMemo<HubTableType[]>(
    () =>
      daoData.map((dao: ITransformedMembership) => ({
        name: { name: dao.name, address: dao.dao },
        activeProposalCount: dao.activeProposalCount,
        fiatTotal: dao.fiatTotal,
        activeMemberCount: dao.activeMemberCount,
        votingPower: dao.votingPower,
        networkId: dao.networkId,
        delegatingTo: dao.delegatingTo,
        memberAddress: dao.memberAddress,
        safeAddress: dao.safeAddress,
        dao: dao.dao,
        isDelegate: dao.isDelegate,
        totalProposalCount: dao.totalProposalCount,
        contractType: dao.contractType,
      })),
    [daoData]
  );

  const exampleColumns = React.useMemo<Column<HubTableType>[]>(
    () => [
      {
        accessor: 'name', // accessor is the "key" in the data
        Cell: ({
          value,
          row,
        }: {
          value: { name?: string; address: string };
          row: UseTableRowProps<HubTableType>;
        }) => {
          return (
            <FirstCell>
              <ProfileAvatar size="sm" address={value.address} />
              {value.name}
              {row.original.isDelegate && <Tag>Delegate</Tag>}
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
          return (
            <Highlight>
              {readableNumber({ amount: value, maxDecimals: 1 })}
            </Highlight>
          );
        },
      },
      {
        Header: 'Vaults',
        accessor: 'fiatTotal',
        Cell: ({ value }: { value?: number }) => {
          return (
            <Highlight>{value != null ? toDollars(value, '') : '--'}</Highlight>
          );
        },
      },
      {
        Header: 'Members',
        accessor: 'activeMemberCount',
        Cell: ({ value }: { value: string | number }) => {
          return (
            <Highlight>
              {readableNumber({ amount: value, maxDecimals: 1 })}
            </Highlight>
          );
        },
      },
      {
        Header: 'Power',
        accessor: 'votingPower',
        Cell: ({ value }: { value: string | number }) => {
          return (
            <Highlight>
              {readableNumber({ amount: value, unit: '%', separator: '' })}
            </Highlight>
          );
        },
      },
      {
        Header: 'Network',
        accessor: 'networkId',
      },
      {
        Header: 'Delegate',
        accessor: 'delegatingTo',
        Cell: ({ value }: { value: string | undefined }) => {
          return (
            <Highlight>
              {value === undefined ? '--' : truncateAddress(value)}
            </Highlight>
          );
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
