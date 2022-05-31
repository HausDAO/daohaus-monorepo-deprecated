import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { DataMd, H3, H5, ParSm, Spinner } from '@daohaus/ui';
import {
  extractKeychain,
  formatDateTimeFromSeconds,
  Keychain,
} from '@daohaus/common-utilities';
import { Dao, Haus } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';

const DaoDataLayout = styled.div`
  display: flex;
  align-items: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const DaoDataContainer = styled.div`
  margin: 0 1rem 1rem 0;
  margin-right: 4rem;
`;

const DaoField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin: 1rem 0 1rem 0;
`;

const DaoPage = () => {
  const { networks } = useHausConnect();
  const { daochain, daoid } = useParams();
  const [loading, setLoading] = useState(false);

  // SDK REFACTOR: examples of best practice and easy to use types from the sdk
  const [dao, setDao] = useState({} as Partial<Dao>);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const rpcs = extractKeychain(networks, 'rpc');

      const haus = Haus.create(rpcs);
      // SDK REFACTOR: how to handle the potential unefined daoid and is it ok to force the type on daochain?
      const res = await haus.query.findDao({
        networkId: daochain as keyof Keychain,
        dao: daoid || '0x0',
      });
      if (res?.data?.dao) {
        // SDK REFACTOR: these types on subqueries are a nightmare whe mataData was in there
        setDao(res.data.dao);
      }

      setLoading(false);
    };

    if (networks) {
      fetchData();
    }
  }, [networks, daochain, daoid]);

  return (
    <>
      {loading && <Spinner />}
      {dao.id && (
        <>
          <H3>{dao.id}</H3>
          <DaoDataLayout>
            <DaoDataContainer>
              <H5>Overview</H5>
              <DaoField>
                <ParSm>Name</ParSm>
                <DataMd>{dao.name || 'no name'}</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Proposals</ParSm>
                <DataMd>{dao.proposalCount}</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Members</ParSm>
                <DataMd>{dao.activeMemberCount}</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Total shares supply</ParSm>
                <DataMd>{dao.totalShares}</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Total loot supply</ParSm>
                <DataMd>{dao.totalLoot}</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Created on</ParSm>
                <DataMd>{formatDateTimeFromSeconds(dao.createdAt)}</DataMd>
              </DaoField>
            </DaoDataContainer>
            <DaoDataContainer>
              <H5>Governance Settings</H5>
              <DaoField>
                <ParSm>Safe contract</ParSm>
                <DataMd>{dao.safeAddress}</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Voting period length</ParSm>
                <DataMd>{dao.votingPeriod}</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Grace period length</ParSm>
                <DataMd>{dao.gracePeriod}</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Required proposal offering</ParSm>
                <DataMd>{dao.proposalOffering} network tokens</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Self sponsor threshold</ParSm>
                <DataMd>{dao.sponsorThreshold} shares</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Quorum percent</ParSm>
                <DataMd>{dao.quorumPercent} %</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Min retention percent</ParSm>
                <DataMd>{dao.minRetentionPercent}%</DataMd>
              </DaoField>
            </DaoDataContainer>
            <DaoDataContainer>
              <H5>Contracts</H5>
              <DaoField>
                <ParSm>Shares contract</ParSm>
                <DataMd>{dao.sharesAddress}</DataMd>
                <DataMd>
                  {dao.shareTokenName} ({dao.shareTokenSymbol})
                </DataMd>
                <DataMd>
                  Shares transferability is {dao.lootPaused ? 'paused' : 'on'}
                </DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Loot contract</ParSm>
                <DataMd>{dao.lootAddress}</DataMd>
                <DataMd>
                  {dao.lootTokenName} ({dao.lootTokenSymbol})
                </DataMd>
                <DataMd>
                  Loot transferability is {dao.lootPaused ? 'paused' : 'on'}
                </DataMd>
              </DaoField>
            </DaoDataContainer>
          </DaoDataLayout>
        </>
      )}
    </>
  );
};

export default DaoPage;
