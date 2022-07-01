import { useState } from 'react';
import styled from 'styled-components';
import { ListType, TemporaryDAOType } from '../utils/appSpecificTypes';
import { DaoCards } from './DaoCards';
import { DataTable } from './Table';
import TableControl from './TableControl';

// Refactored this to be a component that we might be able to reuse
// for explore view and other similar views.

const Body = styled.div`
  grid-area: body;
`;

type DashProps = {
  daoData: TemporaryDAOType[];
};

export const HomeDashboard = ({ daoData }: DashProps) => {
  const [listType, setListType] = useState<ListType>('cards');

  const toggleListType = () => {
    listType === 'cards' ? setListType('table') : setListType('cards');
  };

  return (
    <Body>
      <TableControl listType={listType} toggleListType={toggleListType} />
      {listType === 'cards' && <DaoCards daoData={daoData} />}
      {listType === 'table' && <DataTable />}
    </Body>
  );
};
