import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { H3, H5, ParSm, DataMd, Spinner } from '@daohaus/ui';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import {
  extractKeychain,
  formatDateTimeFromSeconds,
  formatDistanceToNowFromSeconds,
  Keychain,
} from '@daohaus/common-utilities';
import { Haus } from '@daohaus/dao-data';
import { DaoDataContainer, DaoField } from './Page.styles';

const Proposal = () => {
  const { networks } = useHausConnect();
  const { daochain, daoid, proposalid } = useParams();
  const [loading, setLoading] = useState(false);

  // SDK REFACTOR: examples of best practice and easy to use types from the sdk
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [proposal, setProposal] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const rpcs = extractKeychain(networks, 'rpc');

      const haus = Haus.create(rpcs);
      // SDK REFACTOR: how to handle the potential unefined daoid and is it ok to force the type on daochain?
      const res = await haus.query.findProposal({
        networkId: daochain as keyof Keychain,
        dao: daoid || '0x0',
        proposalId: proposalid || '0',
      });

      if (res?.data?.proposal) {
        // SDK REFACTOR: these types on subqueries are a nightmare whe mataData was in there
        setProposal(res.data.proposal);
      }

      setLoading(false);
    };

    if (networks) {
      fetchData();
    }
  }, [networks, daochain, daoid, proposalid]);

  return (
    <>
      {loading && <Spinner />}
      {proposal.id && (
        <>
          <H3>{proposal.proposalId}</H3>
          <DaoDataContainer>
            <H5>Overview</H5>
            <DaoField>
              <ParSm>Title</ParSm>
              <DataMd>{proposal.title || '--'}</DataMd>
            </DaoField>
            <DaoField>
              <ParSm>Description</ParSm>
              <DataMd>{proposal.description || '--'}</DataMd>
            </DaoField>
            <DaoField>
              <ParSm>ContentURI</ParSm>
              <DataMd>{proposal.contentURI || '--'}</DataMd>
            </DaoField>
            <DaoField>
              <ParSm>Details</ParSm>
              <DataMd>{proposal.details || '--'}</DataMd>
            </DaoField>

            <DaoField>
              <ParSm>Type</ParSm>
              <DataMd>{proposal.proposalType || 'unknown'}</DataMd>
            </DaoField>
            <DaoField>
              <ParSm>Offering</ParSm>
              <DataMd>{proposal.proposalOffering}</DataMd>
            </DaoField>
            <DaoField>
              <ParSm>Self sponsor</ParSm>
              <DataMd>{proposal.selfSponsor ? 'yes' : 'no'}</DataMd>
            </DaoField>
            <DaoField>
              <ParSm>Created on</ParSm>
              <DataMd>{formatDateTimeFromSeconds(proposal.createdAt)}</DataMd>
            </DaoField>
            <DaoField>
              <ParSm>Created by</ParSm>
              <DataMd>{proposal.createdBy}</DataMd>
            </DaoField>
          </DaoDataContainer>

          <DaoDataContainer>
            <H5>Status</H5>
            <DaoField>
              <ParSm>Voting Period</ParSm>
              <DataMd>{proposal.votingPeriod} seconds</DataMd>
              <DataMd>
                Starts: {formatDistanceToNowFromSeconds(proposal.votingStarts)}
              </DataMd>
              <DataMd>
                Ends: {formatDistanceToNowFromSeconds(proposal.votingEnds)}
              </DataMd>
            </DaoField>
            <DaoField>
              <DataMd>
                Starts: {formatDistanceToNowFromSeconds(proposal.votingEnds)}
              </DataMd>
              <DataMd>
                Ends: {formatDistanceToNowFromSeconds(proposal.graceEnds)}
              </DataMd>
            </DaoField>
            <DaoField>
              <ParSm>Expiration</ParSm>
              <DataMd>
                Starts: {formatDistanceToNowFromSeconds(proposal.expiration)}
              </DataMd>
            </DaoField>
          </DaoDataContainer>

          <DaoDataContainer>
            <H5>Voting</H5>
            <DaoField>
              <ParSm>Yes</ParSm>
              <DataMd>{proposal.yesVotes} votes</DataMd>
              <DataMd>{proposal.yesBalance} shares</DataMd>
            </DaoField>
            <DaoField>
              <ParSm>No</ParSm>
              <DataMd>{proposal.noVotes} votes</DataMd>
              <DataMd>{proposal.noBalance} shares</DataMd>
            </DaoField>
          </DaoDataContainer>

          <DaoDataContainer>
            <H5>Actions</H5>
            <DaoField>
              <ParSm>Action execution gas estimate</ParSm>
              <DataMd>{proposal.actionGasEstimate}</DataMd>
            </DaoField>
            <DaoField>
              <ParSm>Action data</ParSm>
              <DataMd>{proposal.proposalData}</DataMd>
            </DaoField>
          </DaoDataContainer>

          {proposal.tributeToken && (
            <DaoDataContainer>
              <H5>Tribute data</H5>
              <DaoField>
                <ParSm>Tribute token</ParSm>
                <DataMd>{proposal.tributeToken}</DataMd>
                <DataMd>{proposal.tributeTokenSymbol}</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Tribute Offered</ParSm>
                <DataMd>{proposal.tributeOffered}</DataMd>
                <DataMd>(decimals: {proposal.tributeTokenDecimals})</DataMd>
              </DaoField>
              <DaoField>
                <ParSm>Tributer</ParSm>
                <DataMd>{proposal.tributeEscrowRecipient}</DataMd>
              </DaoField>
            </DaoDataContainer>
          )}
        </>
      )}
    </>
  );
};

export default Proposal;
