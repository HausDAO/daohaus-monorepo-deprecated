import React from 'react';
import { useTable, Column } from 'react-table';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';

import { MembersTableType } from '../pages/Members';

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
