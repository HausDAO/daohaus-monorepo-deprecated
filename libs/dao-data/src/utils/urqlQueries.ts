const DEAFULT_DAO_FIELDS = `
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
` as const;

const DEFAULT_MEMBER_FIELDS = `
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
` as const;

export const DAOS_BY_MEMBER_QUERY = `
  query members($memberAddress: String!) {
    members(where: {memberAddress: $memberAddress}) {
      ${DEFAULT_MEMBER_FIELDS}
      dao {
        ${DEAFULT_DAO_FIELDS}
      }
    }
  }
` as const;

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
` as const;
