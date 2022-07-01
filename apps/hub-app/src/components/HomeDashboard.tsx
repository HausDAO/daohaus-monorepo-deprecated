import { ITransformedMembership, Member_Filter } from '@daohaus/dao-data';
import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { ListType } from '../utils/appSpecificTypes';
import { DaoCards } from './DaoCards';
import { DataTable } from './Table';
import TableControl from './TableControl';

// Refactored this to be a component that we might be able to reuse
// for explore view and other similar views.

const Body = styled.div`
  grid-area: body;
`;

type DashProps = {
  daoData: ITransformedMembership[];
  filterNetworks: Record<string, string>;
  toggleNetworkFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  filterDelegate: Member_Filter | '';
  toggleDelegateFilter: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const HomeDashboard = ({
  daoData,
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
}: DashProps) => {
  const [listType, setListType] = useState<ListType>('cards');
  const toggleListType = () => {
    listType === 'cards' ? setListType('table') : setListType('cards');
  };

  return (
    <Body>
      <TableControl
        listType={listType}
        toggleListType={toggleListType}
        filterNetworks={filterNetworks}
        toggleNetworkFilter={toggleNetworkFilter}
        filterDelegate={filterDelegate}
        toggleDelegateFilter={toggleDelegateFilter}
      />
      {listType === 'cards' && <DaoCards daoData={daoData} />}
      {listType === 'table' && <DataTable />}
    </Body>
  );
};
