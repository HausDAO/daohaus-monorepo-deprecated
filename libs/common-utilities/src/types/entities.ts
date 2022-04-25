// TODO: some testing on the bigint types
// can we import some web3 types - address?

export type Dao = {
  readonly id: string;
  createdAt?: string;
  transactionHashSummon?: string;
  lootAddress?: string;
  safeAddress?: string;
  lootPaused?: boolean;
  sharesPaused?: boolean;
  gracePeriod?: number;
  votingPeriod?: number;
  proposalOffering?: number;
  quorumPercent?: number;
  sponsorThreshold?: number;
  minRetentionPercent?: number;
  shareTokenName?: string;
  shareTokenSymbol?: string;
  totalShares?: number;
  totalLoot?: number;
  latestSponsoredProposalId?: number;
  metaData?: DaoMetaData;
};

export type Member = {
  id: string;
  createdAt?: string;
  memberAddress?: string;
  shares?: string;
  loot?: string;
  delegatingTo?: string;
  delegateShares?: string;
  votes?: [Vote];
  dao?: Dao;
};

export type Proposal = {
  id: string;
  createdAt?: string;
  createdBy?: string;
  proposalId?: number;
  prevProposalId?: number;
  proposalDataHash?: string;
  proposalData?: string;
  details?: string;
  title?: string;
  proposalType?: string;
  contentURI?: string;
  contentURIType?: string;
  status?: string;
  sponsored?: boolean;
  selfSponsor?: boolean;
  sponsor?: string;
  votingPeriod?: number;
  votingStarts?: number;
  votingEnds?: number;
  graceEnds?: number;
  expiration?: number;
  cancelled?: boolean;
  yesBalance?: number;
  noBalance?: number;
  yesVotes?: number;
  noVotes?: number;
  processed?: string;
  actionFailed?: boolean;
  passed?: boolean;
  proposalOffering?: number;
  maxTotalSharesAndLootAtYesVote?: number;
  tributeToken?: string;
  tributeOffered?: number;
  tributeTokenSymbol?: string;
  tributeTokenDecimals?: string;
  tributeEscrowRecipient?: string;
  dao?: Dao;
  votes?: [Vote];
};

export type Vote = {
  id: string;
  createdAt?: string;
  daoAddress?: string;
  approved?: boolean;
  balance?: number;
  proposal?: Proposal;
  member?: Member;
  dao?: Dao;
};

export type DaoMetaData = {
  id: string;
  createdAt?: string;
  createdBy?: string;
  name?: string;
  rawContent?: string;
};

export type RageQuit = {
  id: string;
  createdAt?: string;
  to: string;
  shares: string;
  loot: number;
  tokens: [string];
  member?: Member;
};

export type Shaman = {
  id: string;
  createdAt?: string;
  shamanAddress?: string;
  permissions: number;
  dao?: Dao;
};

export type EventTransaction = {
  id: string;
  createdAt?: string;
  dao?: Dao;
};
