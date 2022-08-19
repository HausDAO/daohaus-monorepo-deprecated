import { MouseEvent, useState, ChangeEvent } from 'react';
import { ITransformedMembership } from '@daohaus/dao-data';
import { ParMd, Spinner, useBreakpoint, widthQuery } from '@daohaus/ui';
import styled from 'styled-components';

import { DaoCards } from './DaoCards';
import { DaoTable } from './DaoTable';
import TableControl from './TableControl';
import { ListType } from '../utils/appSpecificTypes';

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
  sortBy: string;
  switchSortBy: (event: ChangeEvent<HTMLSelectElement>) => void;
  searchTerm: string;
  setSearchTerm: (event: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

export const HomeDashboard = ({
  daoData,
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
  sortBy,
  switchSortBy,
  searchTerm,
  setSearchTerm,
  loading,
}: DashProps) => {
  const [listType, setListType] = useState<ListType>('cards');
  const isMobile = useBreakpoint(widthQuery.sm);
  const toggleListType = () => {
    listType === 'cards' ? setListType('table') : setListType('cards');
  };
  const noDaos = !daoData.length && !loading;

  if (loading) {
    return (
      <Body
        style={{
          height: '30rem',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
          }}
        >
          <Spinner size={isMobile ? '8rem' : '16rem'} />
        </div>
      </Body>
    );
  }

  if (noDaos) {
    return (
      <Body>
        <TableControl
          listType={listType}
          toggleListType={toggleListType}
          filterNetworks={filterNetworks}
          toggleNetworkFilter={toggleNetworkFilter}
          filterDelegate={filterDelegate}
          toggleDelegateFilter={toggleDelegateFilter}
          sortBy={sortBy}
          switchSortBy={switchSortBy}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <NoDaosFound />
      </Body>
    );
  }

  return (
    <Body>
      <TableControl
        listType={listType}
        toggleListType={toggleListType}
        filterNetworks={filterNetworks}
        toggleNetworkFilter={toggleNetworkFilter}
        filterDelegate={filterDelegate}
        toggleDelegateFilter={toggleDelegateFilter}
        sortBy={sortBy}
        switchSortBy={switchSortBy}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalDaos={daoData.length}
      />
      {isMobile ? (
        <Mobile daoData={daoData} />
      ) : (
        <Desktop daoData={daoData} listType={listType} />
      )}
    </Body>
  );
};

const NoDaosFound = () => (
  <ParMd>No DAO memberships found in this wallet.</ParMd>
);

const Mobile = ({ daoData }: { daoData: ITransformedMembership[] }) => {
  return <DaoCards daoData={daoData} />;
};

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
      {listType === 'table' && <DaoTable daoData={daoData} />}
    </>
  );
};
