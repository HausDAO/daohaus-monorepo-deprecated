import { ITransformedMembership } from '@daohaus/dao-data';
import { useBreakpoint, widthQuery } from '@daohaus/ui';
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
  filterDelegate: string;
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
  const isMobile = useBreakpoint(widthQuery.sm);
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
      {isMobile ? (
        <Mobile daoData={daoData} />
      ) : (
        <Desktop daoData={daoData} listType={listType} />
      )}
    </Body>
  );
};

const Mobile = ({ daoData }: { daoData: ITransformedMembership[] }) => (
  <DaoCards daoData={daoData} />
);
const Desktop = ({
  daoData,
  listType,
}: {
  daoData: ITransformedMembership[];
  listType: ListType;
}) => {
  return (
    <>
      {listType === 'cards' && <DaoCards daoData={daoData} />}
      {listType === 'table' && <DataTable />}
    </>
  );
};
