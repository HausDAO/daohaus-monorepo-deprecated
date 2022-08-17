import React, { MouseEvent } from 'react';
import { useTable, Column, HeaderGroup } from 'react-table';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';

import { MembersTableType } from '../pages/Members';
import { Button } from '@daohaus/ui';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { TableHeaderCell } from './SortableTableHeaderCell';

const Table = styled.table`
  width: 100%;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 2rem;
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
  hasNextPaging: boolean;
  handleLoadMore: (event: MouseEvent<HTMLButtonElement>) => void;
  handleColumnSort: (orderBy: string, orderDirection: 'asc' | 'desc') => void;
};

// TS Challenge figure out how to pass generics for the table props
// type DaoTableProps<T extends object> = {
//   tableData: T[];
//   columns: Column<T>[];
// };
// export const DaoTable = <T,>({ tableData, columns }: DaoTableProps<T>) => {
export const DaoTable = ({
  tableData,
  columns,
  hasNextPaging,
  handleLoadMore,
  handleColumnSort,
}: DaoTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns,
      data: tableData,
    });

  return (
    <>
      <Table {...getTableProps}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <Th {...column.getHeaderProps()}>
                    {column.render('Header')}

                    {/* // TODO this here or not??!?!? */}
                    {/* <TableHeaderCell
                      className="hide-sm"
                      label="Join Date"
                      sortable
                      orderBy={column.id}
                      handleColumnSort={handleColumnSort}
                    /> */}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <TBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
      {hasNextPaging && (
        <Button tertiary sm onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </>
  );
};
