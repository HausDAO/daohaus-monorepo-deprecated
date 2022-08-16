import React from 'react';
import { ITransformedMembership } from '@daohaus/dao-data';
import { useTable, Column, UseTableRowProps } from 'react-table';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';
import { ProfileAvatar } from '@daohaus/ui';
import { readableNumbers, truncateAddress } from '@daohaus/common-utilities';
import { TMembership } from '../contexts/DaoContext';
import { MembersTableType } from '../pages/Members';
// import { Tag } from './Tag';

// interface IDaoTableData {
//   daoData: ITransformedMembership[];
// }

const Table = styled.table`
  width: 100%;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-collapse: collapse;
  text-align: left;
`;

const Thead = styled.thead``;

const Th = styled.th`
  color: ${indigoDark.indigo11};
  border-bottom: 1px solid ${indigoDark.indigo5};
  padding: 2rem 0.5rem;
`;

const Tr = styled.tr``;

const Td = styled.td`
  padding: 2rem 0.5rem;
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

const StyledLink = styled.a`
  text-decoration: none;
  color: unset;
`;

// type HubTableType = Omit<ITransformedMembership, 'name'> & {
//   name: { name?: string; address: string; networkId?: string };
// };

// export const DaoTable = ({ daoData }: IDaoTableData) => {
// to take the table data and columns

export type DaoTableProps = {
  tableData: MembersTableType[];
  columns: Column<MembersTableType>[];
};

// TS Challenge figure out how to pass generics for the table props
// type DaoTableProps<T extends object> = {
//   tableData: T[];
//   columns: Column<T>[];
// };
// export const DaoTable = <T,>({ tableData, columns }: DaoTableProps<T>) => {
export const DaoTable = ({ tableData, columns }: DaoTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns,
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
