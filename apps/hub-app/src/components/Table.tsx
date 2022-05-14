import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import { amberDark, crimsonDark } from '@radix-ui/colors';

const Table = styled.table`
  width: 100%;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const Th = styled.th`
  color: ${crimsonDark.crimson11};
  border-bottom: 1px solid ${crimsonDark.crimson5};
  padding: 0.5rem;
`;

const Tr = styled.tr``;

const Td = styled.td`
  text-align: center;
  padding: 1.5rem;
`;

const TBody = styled.tbody``;

const Highlight = styled.p`
  color: ${amberDark.amber9};
`;

export const DataTable = () => {
  const exampleData = React.useMemo(
    () => [
      {
        name: 'AntiMetaMetaGovernanceDao',
        activeProposals: '4',
        vaults: '324 ETH',
        members: '121',
        power: '3.1%',
        network: 'Ethereum',
        delegate: 'billie.eth',
      },
      {
        name: 'PeaceCamp',
        activeProposals: '1',
        vaults: '4.8 ETH',
        members: '42',
        power: '12.6%',
        network: 'Gnosis',
        delegate: '--',
      },
      {
        name: 'UberComplexDao',
        activeProposals: '2',
        vaults: '650 ETH',
        members: '23.5k',
        power: '0.8%',
        network: 'Polygon',
        delegate: '--',
      },
    ],
    []
  );

  const exampleColumns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'name', // accessor is the "key" in the data
        // Cell: ({ value }) => {
        //   return <>{value}</Highlight>;
        // },
      },
      {
        Header: 'Active Proposals',
        accessor: 'activeProposals',
        Cell: ({ value }) => {
          return <Highlight>{value}</Highlight>;
        },
      },
      {
        Header: 'Vaults',
        accessor: 'vaults',
      },
      {
        Header: 'Members',
        accessor: 'members',
      },
      {
        Header: 'Power',
        accessor: 'power',
      },
      {
        Header: 'Network',
        accessor: 'network',
      },
      {
        Header: 'Delegate',
        accessor: 'delegate',
        Cell: ({ value }) => {
          return <Highlight>{value}</Highlight>;
        },
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: exampleColumns,
      data: exampleData,
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
