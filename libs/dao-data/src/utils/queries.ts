export const PROPOSAL_FIELDS = `
  id
  createdAt
  createdBy
  proposalId
  prevProposalId
  proposalDataHash
  proposalData
  details
  title
  proposalType
  contentURI
  contentURIType
  sponsored
  selfSponsor
  sponsor
  votingPeriod
  votingStarts
  votingEnds
  graceEnds
  expiration
  cancelled
  yesBalance
  noBalance
  yesVotes
  noVotes
  processed
  actionFailed
  passed
  proposalOffering
  maxTotalSharesAndLootAtYesVote
  tributeToken
  tributeOffered
  tributeTokenSymbol
  tributeTokenDecimals
  tributeEscrowRecipient
`;

export const DAO_FIELDS = `
  id 
  createdAt
  transactionHashSummon
  lootAddress
  safeAddress
  lootPaused
  sharesPaused
  gracePeriod
  votingPeriod
  proposalOffering
  quorumPercent
  sponsorThreshold
  minRetentionPercent
  shareTokenName
  shareTokenSymbol
  totalShares
  totalLoot
  latestSponsoredProposalId
  metaData { 
    name 
  }
`;

export const VOTE_FIELDS = `
  id
  createdAt
  daoAddress
  approved
  balance
  proposal {
    id
    proposalId
  }
  member {
    id
    memberAddress
  }
`;

export const MEMBER_FIELDS = `
  id
  createdAt
  memberAddress
  shares
  loot
  delegatingTo
  delegateShares
  votes {
    createdAt
    approved
    balance
  }
  dao {
    id
  }
`;

export const RAGE_QUIT_FIELDS = `
  id
  createdAt
  to
  shares
  loot
  tokens
  member {
    id
    memberAddress
  }
`;

export const DAO_OVERVIEW = `
  query dao($dao: String!) {
    dao(
      id: $dao
    ) {
      ${DAO_FIELDS}
    }
  }
`;

export const DAOS = `
  query daos {
    daos {
      ${DAO_FIELDS}
    }
  }
`;

export const DAO_PROPOSALS = `
  query proposals($dao: String!) {
    proposals(
      where: {dao: $dao}
      orderBy: createdAt
      orderDirection: desc 
    ) {
      ${PROPOSAL_FIELDS}
    }
  }
`;

export const LATEST_TX = `
  query eventTransaction {
    eventTransactions(first: 1, 
      orderBy: createdAt, orderDirection: desc) {
      id
      createdAt
    }
  }
`;

export const LATEST_TX_BY_DAO = `
  query eventTransactions($dao: String!) {
    eventTransactions(
        first: 1, 
        orderBy: createdAt, 
        orderDirection: desc
        where: { dao: $dao }
    ) {
        id
        createdAt
    }
}
`;
