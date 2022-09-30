import {
  charLimit,
  getNetworkName,
  handleErrorMessage,
  isValidNetwork,
  readableNumbers,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import {
  Badge,
  Bold,
  border,
  breakpoints,
  H2,
  ParLg,
  ParMd,
  ProfileAvatar,
  SingleColumnLayout,
  Spinner,
  Tag,
  useBreakpoint,
  useDebounce,
  widthQuery,
} from '@daohaus/ui';
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  defaultNetworks,
  DEFAULT_SORT_KEY,
  getDelegateFilter,
  SORT_FIELDS,
} from '../utils/hub';
import { ButtonLink } from './ButtonLink';

// import { DaoCards } from './DaoCards';
// import { DaoTable } from './DaoTable';
// import TableControl from './TableControl';
// import { ListType } from '../utils/appSpecificTypes';

enum ListType {
  Cards,
  Table,
}

export const HomeDashboard = () => {
  const { address } = useHausConnect();
  const isMobile = useBreakpoint(widthQuery.sm);

  const [daoData, setDaoData] = useState<ITransformedMembership[]>([]);
  const [filterNetworks, setFilterNetworks] =
    useState<Record<string, string>>(defaultNetworks);
  const [filterDelegate, setFilterDelegate] = useState<string | ''>('');
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_KEY);
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [listType, setListType] = useState<ListType>(ListType.Cards);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);

  useEffect(() => {
    let shouldUpdate = true;
    const getDaos = async (address: string) => {
      setLoading(true);
      try {
        const haus = Haus.create();
        const query = await haus.profile.listDaosByMember({
          memberAddress: address,
          networkIds: Object.keys(filterNetworks) as ValidNetwork[],
          includeTokens: true,
          daoFilter: { name_contains_nocase: debouncedSearchTerm },
          memberFilter: getDelegateFilter(filterDelegate, address),
          ordering: SORT_FIELDS[sortBy].ordering,
        });
        if (query.data?.daos && shouldUpdate) {
          setDaoData(query.data.daos);
        }
      } catch (error) {
        const errMsg = handleErrorMessage({
          error,
          fallback: 'Error loading DAOs',
        });
        console.error(errMsg);
      } finally {
        setLoading(false);
      }
    };
    if (!address) return;
    getDaos(address);
    return () => {
      shouldUpdate = false;
    };
  }, [address, filterNetworks, filterDelegate, sortBy, debouncedSearchTerm]);

  const toggleNetworkFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const network = event.currentTarget.value;
    if (network && isValidNetwork(network)) {
      filterNetworks[network]
        ? setFilterNetworks((prevState) => {
            delete prevState[network];
            return { ...prevState };
          })
        : setFilterNetworks((prevState) => ({
            ...prevState,
            [network]: network,
          }));
    }
  };
  const toggleDelegateFilter = (event: MouseEvent<HTMLButtonElement>) => {
    setFilterDelegate((prevState) =>
      prevState === event.currentTarget.value ? '' : event.currentTarget.value
    );
  };
  const switchSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm((prevState) =>
      prevState === event.target.value ? '' : event.target.value
    );
  };

  const tableActions = {
    toggleNetworkFilter,
    toggleDelegateFilter,
    switchSortBy,
    handleSearchTermChange,
  };

  if (loading) {
    <Loading isMobile={isMobile} />;
  }
  if (!daoData.length) {
    <NoDaosFound />;
  }

  return <DaoList daoData={daoData} isMobile={isMobile} listType={listType} />;
};

const CenterFrame = styled.div`
  height: 30rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner {
    position: absolute;
  }
`;

const Loading = ({ isMobile }: { isMobile: boolean }) => (
  <CenterFrame>
    <div className="inner">
      <Spinner size={isMobile ? '8rem' : '16rem'} />
    </div>
  </CenterFrame>
);
const NoDaosFound = () => (
  <CenterFrame>
    <H2>No Daos Found</H2>
  </CenterFrame>
);

const TableControl = ({ children }: { children: ReactNode }) => {
  return <SingleColumnLayout>{children}</SingleColumnLayout>;
};

const DaoList = ({
  daoData,
  isMobile,
  listType,
}: {
  daoData: ITransformedMembership[];
  isMobile: boolean;
  listType: ListType;
}) => {
  if (isMobile) {
    return <DaoCards daoData={daoData} />;
  }

  if (listType === ListType.Cards) return <DaoCards daoData={daoData} />;
  // if (listType === ListType.Table) return <DaoTable daoData={daoData} />;

  return null;
};

const CardListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 6rem;
  row-gap: 3rem;
  justify-content: center;
  @media (min-width: ${breakpoints.xs}) {
    justify-content: flex-start;
  }
`;

const DaoCards = ({ daoData }: { daoData: ITransformedMembership[] }) => (
  <CardListBox>
    {daoData.map((dao) => (
      <DaoCard key={dao.dao} {...dao} />
    ))}
  </CardListBox>
);

const StyledDaoCard = styled.div`
  background-color: ${(props) => props.theme.card.bg};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 36rem;
  min-width: 26rem;
  border: 1px solid ${(props) => props.theme.card.border};
  padding: 2.4rem;
  border-radius: ${border.radius};
  .top-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.3rem;
  }

  .badge {
    transform: translateX(-0.8rem);
  }
  .stats-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.4rem;
    p {
      margin-bottom: 0.6rem;
    }
  }
  .tag-box {
    font-size: 1.4rem;
    margin-bottom: 2.4rem;
    div {
      margin-right: 1.5rem;
    }
  }
`;

const DaoCard = ({
  isDelegate,
  dao,
  activeMemberCount,
  fiatTotal,
  activeProposalCount,
  totalProposalCount,
  votingPower,
  name,
  networkId,
  contractType,
}: ITransformedMembership) => {
  return (
    <StyledDaoCard className="dao-card">
      <div className="top-box">
        <div className="alert-box">
          <ProfileAvatar size="xl" address={dao} />
          {activeProposalCount > 0 && (
            <Badge
              badgeSize="sm"
              badgeLabel={activeProposalCount}
              className="badge"
            />
          )}
        </div>
        {isDelegate && <Tag tagColor="yellow">Delegate</Tag>}
      </div>
      <ParLg className="dao-title">
        {name ? charLimit(name, 21) : charLimit(dao, 21)}{' '}
      </ParLg>
      <div className="stats-box">
        {activeMemberCount && (
          <ParMd>
            <Bold>
              {readableNumbers.toNumber({ value: activeMemberCount })}
            </Bold>{' '}
            {parseInt(
              readableNumbers.toNumber({ value: activeMemberCount })
            ) === 1
              ? 'Member'
              : 'Members'}
          </ParMd>
        )}
        {fiatTotal != null && (
          <ParMd>
            <Bold>
              {readableNumbers.toDollars({
                value: fiatTotal,
                unit: 'USD',
                separator: ' ',
              })}
            </Bold>
          </ParMd>
        )}
        {totalProposalCount && (
          <ParMd>
            <Bold>
              {readableNumbers.toNumber({ value: totalProposalCount })}
            </Bold>{' '}
            {parseInt(
              readableNumbers.toNumber({ value: totalProposalCount })
            ) === 1
              ? 'Proposal'
              : 'Proposals'}
          </ParMd>
        )}
        {votingPower > 0 ? (
          <ParMd>
            <Bold>
              {readableNumbers.toPercentDecimals({
                value: votingPower,
                separator: '',
              })}
            </Bold>{' '}
            Voting Power
          </ParMd>
        ) : (
          <ParMd>No Voting Power</ParMd>
        )}
      </div>
      <div className="tag-box">
        <Tag tagColor="red">{getNetworkName(networkId)}</Tag>
        <Tag tagColor="blue">{contractType}</Tag>
      </div>
      <ButtonLink
        secondary
        fullWidth
        centerAlign
        href={`/molochV3/${networkId}/${dao}`}
        target="_blank"
        rel="noreferrer"
      >
        Go
      </ButtonLink>
    </StyledDaoCard>
  );
};
