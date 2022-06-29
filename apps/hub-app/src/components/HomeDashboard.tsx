import styled from 'styled-components';
import { ListType, TemporaryDAOType } from '../utils/appSpecificTypes';
import { DaoCards } from './DaoCards';
import { DataTable } from './Table';
import TableControl from './TableControl';

// Refactor this to be a component that we might be able to reuse
// for explore view and other similar views

const Body = styled.div`
  grid-area: body;
`;

type DashProps = {
  listType: ListType;
  daoData: TemporaryDAOType[];
  toggleListType: () => void;
};

export const HomeDashboard = ({
  listType,
  daoData,
  toggleListType,
}: DashProps) => {
  return (
    <Body>
      <TableControl listType={listType} toggleListType={toggleListType} />
      {listType === 'cards' && <DaoCards daoData={daoData} />}
      {listType === 'table' && <DataTable />}
    </Body>
  );
};
