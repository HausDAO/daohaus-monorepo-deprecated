export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
}

export interface BlockChangedFilter {
  number_gte: Scalars['Int'];
}

export interface Block_Height {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
}

export interface Dao {
  __typename?: 'Dao';
  activeMemberCount: Scalars['BigInt'];
  createdAt: Scalars['String'];
  eventTransactions?: Maybe<EventTransaction>;
  gracePeriod: Scalars['BigInt'];
  id: Scalars['ID'];
  latestSponsoredProposalId: Scalars['BigInt'];
  lootAddress: Scalars['Bytes'];
  lootPaused: Scalars['Boolean'];
  members?: Maybe<Array<Member>>;
  metaData?: Maybe<MetaData>;
  minRetentionPercent: Scalars['BigInt'];
  proposalCount: Scalars['BigInt'];
  proposalOffering: Scalars['BigInt'];
  proposals?: Maybe<Array<Proposal>>;
  quorumPercent: Scalars['BigInt'];
  rageQuits?: Maybe<Array<RageQuit>>;
  safeAddress: Scalars['Bytes'];
  shaman?: Maybe<Array<Shaman>>;
  shareTokenName?: Maybe<Scalars['String']>;
  shareTokenSymbol?: Maybe<Scalars['String']>;
  sharesPaused: Scalars['Boolean'];
  sponsorThreshold: Scalars['BigInt'];
  totalLoot: Scalars['BigInt'];
  totalShares: Scalars['BigInt'];
  transactionHashSummon: Scalars['Bytes'];
  votingPeriod: Scalars['BigInt'];
}

export interface DaoMembersArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Member_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Member_Filter>;
}

export interface DaoProposalsArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Proposal_Filter>;
}

export interface DaoRageQuitsArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RageQuit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RageQuit_Filter>;
}

export interface DaoShamanArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Shaman_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Shaman_Filter>;
}

export interface Dao_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  activeMemberCount?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_gt?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_gte?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  activeMemberCount_lt?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_lte?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_not?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt?: InputMaybe<Scalars['String']>;
  createdAt_contains?: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_gt?: InputMaybe<Scalars['String']>;
  createdAt_gte?: InputMaybe<Scalars['String']>;
  createdAt_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt?: InputMaybe<Scalars['String']>;
  createdAt_lte?: InputMaybe<Scalars['String']>;
  createdAt_not?: InputMaybe<Scalars['String']>;
  createdAt_not_contains?: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gracePeriod?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_gt?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_gte?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gracePeriod_lt?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_lte?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_not?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  latestSponsoredProposalId?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_gt?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_gte?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  latestSponsoredProposalId_lt?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_lte?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_not?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lootAddress?: InputMaybe<Scalars['Bytes']>;
  lootAddress_contains?: InputMaybe<Scalars['Bytes']>;
  lootAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lootAddress_not?: InputMaybe<Scalars['Bytes']>;
  lootAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  lootAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lootPaused?: InputMaybe<Scalars['Boolean']>;
  lootPaused_in?: InputMaybe<Array<Scalars['Boolean']>>;
  lootPaused_not?: InputMaybe<Scalars['Boolean']>;
  lootPaused_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  minRetentionPercent?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_gt?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_gte?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minRetentionPercent_lt?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_lte?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_not?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalCount?: InputMaybe<Scalars['BigInt']>;
  proposalCount_gt?: InputMaybe<Scalars['BigInt']>;
  proposalCount_gte?: InputMaybe<Scalars['BigInt']>;
  proposalCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalCount_lt?: InputMaybe<Scalars['BigInt']>;
  proposalCount_lte?: InputMaybe<Scalars['BigInt']>;
  proposalCount_not?: InputMaybe<Scalars['BigInt']>;
  proposalCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalOffering?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_gt?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_gte?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalOffering_lt?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_lte?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_not?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumPercent?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_gt?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_gte?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumPercent_lt?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_lte?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_not?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  safeAddress?: InputMaybe<Scalars['Bytes']>;
  safeAddress_contains?: InputMaybe<Scalars['Bytes']>;
  safeAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  safeAddress_not?: InputMaybe<Scalars['Bytes']>;
  safeAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  safeAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shareTokenName?: InputMaybe<Scalars['String']>;
  shareTokenName_contains?: InputMaybe<Scalars['String']>;
  shareTokenName_contains_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_ends_with?: InputMaybe<Scalars['String']>;
  shareTokenName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_gt?: InputMaybe<Scalars['String']>;
  shareTokenName_gte?: InputMaybe<Scalars['String']>;
  shareTokenName_in?: InputMaybe<Array<Scalars['String']>>;
  shareTokenName_lt?: InputMaybe<Scalars['String']>;
  shareTokenName_lte?: InputMaybe<Scalars['String']>;
  shareTokenName_not?: InputMaybe<Scalars['String']>;
  shareTokenName_not_contains?: InputMaybe<Scalars['String']>;
  shareTokenName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_not_ends_with?: InputMaybe<Scalars['String']>;
  shareTokenName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_not_in?: InputMaybe<Array<Scalars['String']>>;
  shareTokenName_not_starts_with?: InputMaybe<Scalars['String']>;
  shareTokenName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_starts_with?: InputMaybe<Scalars['String']>;
  shareTokenName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_contains?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_contains_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_ends_with?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_gt?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_gte?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  shareTokenSymbol_lt?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_lte?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_contains?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  shareTokenSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_starts_with?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sharesPaused?: InputMaybe<Scalars['Boolean']>;
  sharesPaused_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sharesPaused_not?: InputMaybe<Scalars['Boolean']>;
  sharesPaused_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sponsorThreshold?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_gt?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_gte?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sponsorThreshold_lt?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_lte?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_not?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLoot?: InputMaybe<Scalars['BigInt']>;
  totalLoot_gt?: InputMaybe<Scalars['BigInt']>;
  totalLoot_gte?: InputMaybe<Scalars['BigInt']>;
  totalLoot_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLoot_lt?: InputMaybe<Scalars['BigInt']>;
  totalLoot_lte?: InputMaybe<Scalars['BigInt']>;
  totalLoot_not?: InputMaybe<Scalars['BigInt']>;
  totalLoot_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalShares?: InputMaybe<Scalars['BigInt']>;
  totalShares_gt?: InputMaybe<Scalars['BigInt']>;
  totalShares_gte?: InputMaybe<Scalars['BigInt']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalShares_lt?: InputMaybe<Scalars['BigInt']>;
  totalShares_lte?: InputMaybe<Scalars['BigInt']>;
  totalShares_not?: InputMaybe<Scalars['BigInt']>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHashSummon?: InputMaybe<Scalars['Bytes']>;
  transactionHashSummon_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHashSummon_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHashSummon_not?: InputMaybe<Scalars['Bytes']>;
  transactionHashSummon_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHashSummon_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  votingPeriod?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_not?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
}

export type Dao_OrderBy =
  | 'activeMemberCount'
  | 'createdAt'
  | 'eventTransactions'
  | 'gracePeriod'
  | 'id'
  | 'latestSponsoredProposalId'
  | 'lootAddress'
  | 'lootPaused'
  | 'members'
  | 'metaData'
  | 'minRetentionPercent'
  | 'proposalCount'
  | 'proposalOffering'
  | 'proposals'
  | 'quorumPercent'
  | 'rageQuits'
  | 'safeAddress'
  | 'shaman'
  | 'shareTokenName'
  | 'shareTokenSymbol'
  | 'sharesPaused'
  | 'sponsorThreshold'
  | 'totalLoot'
  | 'totalShares'
  | 'transactionHashSummon'
  | 'votingPeriod';

export interface EventTransaction {
  __typename?: 'EventTransaction';
  createdAt: Scalars['String'];
  dao: Dao;
  id: Scalars['ID'];
}

export interface EventTransaction_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['String']>;
  createdAt_contains?: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_gt?: InputMaybe<Scalars['String']>;
  createdAt_gte?: InputMaybe<Scalars['String']>;
  createdAt_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt?: InputMaybe<Scalars['String']>;
  createdAt_lte?: InputMaybe<Scalars['String']>;
  createdAt_not?: InputMaybe<Scalars['String']>;
  createdAt_not_contains?: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao?: InputMaybe<Scalars['String']>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
}

export type EventTransaction_OrderBy = 'createdAt' | 'dao' | 'id';

export interface Member {
  __typename?: 'Member';
  createdAt: Scalars['String'];
  dao: Dao;
  delegateShares: Scalars['BigInt'];
  delegatingTo: Scalars['Bytes'];
  id: Scalars['ID'];
  loot: Scalars['BigInt'];
  memberAddress: Scalars['Bytes'];
  shares: Scalars['BigInt'];
  votes?: Maybe<Array<Vote>>;
}

export interface MemberVotesArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vote_Filter>;
}

export interface Member_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['String']>;
  createdAt_contains?: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_gt?: InputMaybe<Scalars['String']>;
  createdAt_gte?: InputMaybe<Scalars['String']>;
  createdAt_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt?: InputMaybe<Scalars['String']>;
  createdAt_lte?: InputMaybe<Scalars['String']>;
  createdAt_not?: InputMaybe<Scalars['String']>;
  createdAt_not_contains?: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao?: InputMaybe<Scalars['String']>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegateShares?: InputMaybe<Scalars['BigInt']>;
  delegateShares_gt?: InputMaybe<Scalars['BigInt']>;
  delegateShares_gte?: InputMaybe<Scalars['BigInt']>;
  delegateShares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegateShares_lt?: InputMaybe<Scalars['BigInt']>;
  delegateShares_lte?: InputMaybe<Scalars['BigInt']>;
  delegateShares_not?: InputMaybe<Scalars['BigInt']>;
  delegateShares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatingTo?: InputMaybe<Scalars['Bytes']>;
  delegatingTo_contains?: InputMaybe<Scalars['Bytes']>;
  delegatingTo_in?: InputMaybe<Array<Scalars['Bytes']>>;
  delegatingTo_not?: InputMaybe<Scalars['Bytes']>;
  delegatingTo_not_contains?: InputMaybe<Scalars['Bytes']>;
  delegatingTo_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  loot?: InputMaybe<Scalars['BigInt']>;
  loot_gt?: InputMaybe<Scalars['BigInt']>;
  loot_gte?: InputMaybe<Scalars['BigInt']>;
  loot_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loot_lt?: InputMaybe<Scalars['BigInt']>;
  loot_lte?: InputMaybe<Scalars['BigInt']>;
  loot_not?: InputMaybe<Scalars['BigInt']>;
  loot_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  memberAddress?: InputMaybe<Scalars['Bytes']>;
  memberAddress_contains?: InputMaybe<Scalars['Bytes']>;
  memberAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  memberAddress_not?: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shares?: InputMaybe<Scalars['BigInt']>;
  shares_gt?: InputMaybe<Scalars['BigInt']>;
  shares_gte?: InputMaybe<Scalars['BigInt']>;
  shares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_lt?: InputMaybe<Scalars['BigInt']>;
  shares_lte?: InputMaybe<Scalars['BigInt']>;
  shares_not?: InputMaybe<Scalars['BigInt']>;
  shares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
}

export type Member_OrderBy =
  | 'createdAt'
  | 'dao'
  | 'delegateShares'
  | 'delegatingTo'
  | 'id'
  | 'loot'
  | 'memberAddress'
  | 'shares'
  | 'votes';

export interface MetaData {
  __typename?: 'MetaData';
  createdAt: Scalars['String'];
  createdBy: Scalars['Bytes'];
  dao?: Maybe<Dao>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  rawContent: Scalars['String'];
}

export interface MetaData_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['String']>;
  createdAt_contains?: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_gt?: InputMaybe<Scalars['String']>;
  createdAt_gte?: InputMaybe<Scalars['String']>;
  createdAt_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt?: InputMaybe<Scalars['String']>;
  createdAt_lte?: InputMaybe<Scalars['String']>;
  createdAt_not?: InputMaybe<Scalars['String']>;
  createdAt_not_contains?: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdBy?: InputMaybe<Scalars['Bytes']>;
  createdBy_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdBy_not?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dao?: InputMaybe<Scalars['String']>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rawContent?: InputMaybe<Scalars['String']>;
  rawContent_contains?: InputMaybe<Scalars['String']>;
  rawContent_contains_nocase?: InputMaybe<Scalars['String']>;
  rawContent_ends_with?: InputMaybe<Scalars['String']>;
  rawContent_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rawContent_gt?: InputMaybe<Scalars['String']>;
  rawContent_gte?: InputMaybe<Scalars['String']>;
  rawContent_in?: InputMaybe<Array<Scalars['String']>>;
  rawContent_lt?: InputMaybe<Scalars['String']>;
  rawContent_lte?: InputMaybe<Scalars['String']>;
  rawContent_not?: InputMaybe<Scalars['String']>;
  rawContent_not_contains?: InputMaybe<Scalars['String']>;
  rawContent_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rawContent_not_ends_with?: InputMaybe<Scalars['String']>;
  rawContent_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rawContent_not_in?: InputMaybe<Array<Scalars['String']>>;
  rawContent_not_starts_with?: InputMaybe<Scalars['String']>;
  rawContent_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rawContent_starts_with?: InputMaybe<Scalars['String']>;
  rawContent_starts_with_nocase?: InputMaybe<Scalars['String']>;
}

export type MetaData_OrderBy =
  | 'createdAt'
  | 'createdBy'
  | 'dao'
  | 'id'
  | 'name'
  | 'rawContent';

/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc';

export interface Proposal {
  __typename?: 'Proposal';
  actionFailed: Scalars['Boolean'];
  cancelled: Scalars['Boolean'];
  contentURI?: Maybe<Scalars['String']>;
  contentURIType?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  createdBy: Scalars['Bytes'];
  dao: Dao;
  description?: Maybe<Scalars['String']>;
  details: Scalars['String'];
  expiration: Scalars['BigInt'];
  graceEnds: Scalars['BigInt'];
  id: Scalars['ID'];
  maxTotalSharesAndLootAtYesVote: Scalars['BigInt'];
  noBalance: Scalars['BigInt'];
  noVotes: Scalars['BigInt'];
  passed: Scalars['Boolean'];
  prevProposalId: Scalars['BigInt'];
  processed: Scalars['Boolean'];
  proposalData: Scalars['Bytes'];
  proposalDataHash: Scalars['Bytes'];
  proposalId: Scalars['BigInt'];
  proposalOffering: Scalars['BigInt'];
  proposalType: Scalars['String'];
  selfSponsor: Scalars['Boolean'];
  sponsor: Scalars['Bytes'];
  sponsored: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
  tributeEscrowRecipient?: Maybe<Scalars['Bytes']>;
  tributeOffered?: Maybe<Scalars['BigInt']>;
  tributeToken?: Maybe<Scalars['Bytes']>;
  tributeTokenDecimals?: Maybe<Scalars['BigInt']>;
  tributeTokenSymbol?: Maybe<Scalars['String']>;
  votes?: Maybe<Array<Vote>>;
  votingEnds: Scalars['BigInt'];
  votingPeriod: Scalars['BigInt'];
  votingStarts: Scalars['BigInt'];
  yesBalance: Scalars['BigInt'];
  yesVotes: Scalars['BigInt'];
}

export interface ProposalVotesArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vote_Filter>;
}

export interface Proposal_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  actionFailed?: InputMaybe<Scalars['Boolean']>;
  actionFailed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  actionFailed_not?: InputMaybe<Scalars['Boolean']>;
  actionFailed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  cancelled?: InputMaybe<Scalars['Boolean']>;
  cancelled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  cancelled_not?: InputMaybe<Scalars['Boolean']>;
  cancelled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  contentURI?: InputMaybe<Scalars['String']>;
  contentURIType?: InputMaybe<Scalars['String']>;
  contentURIType_contains?: InputMaybe<Scalars['String']>;
  contentURIType_contains_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_ends_with?: InputMaybe<Scalars['String']>;
  contentURIType_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_gt?: InputMaybe<Scalars['String']>;
  contentURIType_gte?: InputMaybe<Scalars['String']>;
  contentURIType_in?: InputMaybe<Array<Scalars['String']>>;
  contentURIType_lt?: InputMaybe<Scalars['String']>;
  contentURIType_lte?: InputMaybe<Scalars['String']>;
  contentURIType_not?: InputMaybe<Scalars['String']>;
  contentURIType_not_contains?: InputMaybe<Scalars['String']>;
  contentURIType_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_not_ends_with?: InputMaybe<Scalars['String']>;
  contentURIType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_not_in?: InputMaybe<Array<Scalars['String']>>;
  contentURIType_not_starts_with?: InputMaybe<Scalars['String']>;
  contentURIType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_starts_with?: InputMaybe<Scalars['String']>;
  contentURIType_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contentURI_contains?: InputMaybe<Scalars['String']>;
  contentURI_contains_nocase?: InputMaybe<Scalars['String']>;
  contentURI_ends_with?: InputMaybe<Scalars['String']>;
  contentURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentURI_gt?: InputMaybe<Scalars['String']>;
  contentURI_gte?: InputMaybe<Scalars['String']>;
  contentURI_in?: InputMaybe<Array<Scalars['String']>>;
  contentURI_lt?: InputMaybe<Scalars['String']>;
  contentURI_lte?: InputMaybe<Scalars['String']>;
  contentURI_not?: InputMaybe<Scalars['String']>;
  contentURI_not_contains?: InputMaybe<Scalars['String']>;
  contentURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contentURI_not_ends_with?: InputMaybe<Scalars['String']>;
  contentURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  contentURI_not_starts_with?: InputMaybe<Scalars['String']>;
  contentURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contentURI_starts_with?: InputMaybe<Scalars['String']>;
  contentURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['String']>;
  createdAt_contains?: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_gt?: InputMaybe<Scalars['String']>;
  createdAt_gte?: InputMaybe<Scalars['String']>;
  createdAt_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt?: InputMaybe<Scalars['String']>;
  createdAt_lte?: InputMaybe<Scalars['String']>;
  createdAt_not?: InputMaybe<Scalars['String']>;
  createdAt_not_contains?: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdBy?: InputMaybe<Scalars['Bytes']>;
  createdBy_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdBy_not?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dao?: InputMaybe<Scalars['String']>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  details_contains?: InputMaybe<Scalars['String']>;
  details_contains_nocase?: InputMaybe<Scalars['String']>;
  details_ends_with?: InputMaybe<Scalars['String']>;
  details_ends_with_nocase?: InputMaybe<Scalars['String']>;
  details_gt?: InputMaybe<Scalars['String']>;
  details_gte?: InputMaybe<Scalars['String']>;
  details_in?: InputMaybe<Array<Scalars['String']>>;
  details_lt?: InputMaybe<Scalars['String']>;
  details_lte?: InputMaybe<Scalars['String']>;
  details_not?: InputMaybe<Scalars['String']>;
  details_not_contains?: InputMaybe<Scalars['String']>;
  details_not_contains_nocase?: InputMaybe<Scalars['String']>;
  details_not_ends_with?: InputMaybe<Scalars['String']>;
  details_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  details_not_in?: InputMaybe<Array<Scalars['String']>>;
  details_not_starts_with?: InputMaybe<Scalars['String']>;
  details_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  details_starts_with?: InputMaybe<Scalars['String']>;
  details_starts_with_nocase?: InputMaybe<Scalars['String']>;
  expiration?: InputMaybe<Scalars['BigInt']>;
  expiration_gt?: InputMaybe<Scalars['BigInt']>;
  expiration_gte?: InputMaybe<Scalars['BigInt']>;
  expiration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration_lt?: InputMaybe<Scalars['BigInt']>;
  expiration_lte?: InputMaybe<Scalars['BigInt']>;
  expiration_not?: InputMaybe<Scalars['BigInt']>;
  expiration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  graceEnds?: InputMaybe<Scalars['BigInt']>;
  graceEnds_gt?: InputMaybe<Scalars['BigInt']>;
  graceEnds_gte?: InputMaybe<Scalars['BigInt']>;
  graceEnds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  graceEnds_lt?: InputMaybe<Scalars['BigInt']>;
  graceEnds_lte?: InputMaybe<Scalars['BigInt']>;
  graceEnds_not?: InputMaybe<Scalars['BigInt']>;
  graceEnds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maxTotalSharesAndLootAtYesVote?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_gt?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_gte?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxTotalSharesAndLootAtYesVote_lt?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_lte?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_not?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noBalance?: InputMaybe<Scalars['BigInt']>;
  noBalance_gt?: InputMaybe<Scalars['BigInt']>;
  noBalance_gte?: InputMaybe<Scalars['BigInt']>;
  noBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noBalance_lt?: InputMaybe<Scalars['BigInt']>;
  noBalance_lte?: InputMaybe<Scalars['BigInt']>;
  noBalance_not?: InputMaybe<Scalars['BigInt']>;
  noBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noVotes?: InputMaybe<Scalars['BigInt']>;
  noVotes_gt?: InputMaybe<Scalars['BigInt']>;
  noVotes_gte?: InputMaybe<Scalars['BigInt']>;
  noVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noVotes_lt?: InputMaybe<Scalars['BigInt']>;
  noVotes_lte?: InputMaybe<Scalars['BigInt']>;
  noVotes_not?: InputMaybe<Scalars['BigInt']>;
  noVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  passed?: InputMaybe<Scalars['Boolean']>;
  passed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  passed_not?: InputMaybe<Scalars['Boolean']>;
  passed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  prevProposalId?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_gt?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_gte?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prevProposalId_lt?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_lte?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_not?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  proposalData?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash_contains?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalDataHash_not?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalData_contains?: InputMaybe<Scalars['Bytes']>;
  proposalData_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalData_not?: InputMaybe<Scalars['Bytes']>;
  proposalData_not_contains?: InputMaybe<Scalars['Bytes']>;
  proposalData_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalId?: InputMaybe<Scalars['BigInt']>;
  proposalId_gt?: InputMaybe<Scalars['BigInt']>;
  proposalId_gte?: InputMaybe<Scalars['BigInt']>;
  proposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalId_lt?: InputMaybe<Scalars['BigInt']>;
  proposalId_lte?: InputMaybe<Scalars['BigInt']>;
  proposalId_not?: InputMaybe<Scalars['BigInt']>;
  proposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalOffering?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_gt?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_gte?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalOffering_lt?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_lte?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_not?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalType?: InputMaybe<Scalars['String']>;
  proposalType_contains?: InputMaybe<Scalars['String']>;
  proposalType_contains_nocase?: InputMaybe<Scalars['String']>;
  proposalType_ends_with?: InputMaybe<Scalars['String']>;
  proposalType_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposalType_gt?: InputMaybe<Scalars['String']>;
  proposalType_gte?: InputMaybe<Scalars['String']>;
  proposalType_in?: InputMaybe<Array<Scalars['String']>>;
  proposalType_lt?: InputMaybe<Scalars['String']>;
  proposalType_lte?: InputMaybe<Scalars['String']>;
  proposalType_not?: InputMaybe<Scalars['String']>;
  proposalType_not_contains?: InputMaybe<Scalars['String']>;
  proposalType_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposalType_not_ends_with?: InputMaybe<Scalars['String']>;
  proposalType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposalType_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposalType_not_starts_with?: InputMaybe<Scalars['String']>;
  proposalType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposalType_starts_with?: InputMaybe<Scalars['String']>;
  proposalType_starts_with_nocase?: InputMaybe<Scalars['String']>;
  selfSponsor?: InputMaybe<Scalars['Boolean']>;
  selfSponsor_in?: InputMaybe<Array<Scalars['Boolean']>>;
  selfSponsor_not?: InputMaybe<Scalars['Boolean']>;
  selfSponsor_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sponsor?: InputMaybe<Scalars['Bytes']>;
  sponsor_contains?: InputMaybe<Scalars['Bytes']>;
  sponsor_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sponsor_not?: InputMaybe<Scalars['Bytes']>;
  sponsor_not_contains?: InputMaybe<Scalars['Bytes']>;
  sponsor_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sponsored?: InputMaybe<Scalars['Boolean']>;
  sponsored_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sponsored_not?: InputMaybe<Scalars['Boolean']>;
  sponsored_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_contains_nocase?: InputMaybe<Scalars['String']>;
  title_ends_with?: InputMaybe<Scalars['String']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_gt?: InputMaybe<Scalars['String']>;
  title_gte?: InputMaybe<Scalars['String']>;
  title_in?: InputMaybe<Array<Scalars['String']>>;
  title_lt?: InputMaybe<Scalars['String']>;
  title_lte?: InputMaybe<Scalars['String']>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']>;
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<Scalars['String']>>;
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  title_starts_with?: InputMaybe<Scalars['String']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tributeEscrowRecipient?: InputMaybe<Scalars['Bytes']>;
  tributeEscrowRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  tributeEscrowRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tributeEscrowRecipient_not?: InputMaybe<Scalars['Bytes']>;
  tributeEscrowRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  tributeEscrowRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tributeOffered?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_gt?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_gte?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tributeOffered_lt?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_lte?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_not?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tributeToken?: InputMaybe<Scalars['Bytes']>;
  tributeTokenDecimals?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_gt?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_gte?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tributeTokenDecimals_lt?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_lte?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_not?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tributeTokenSymbol?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_contains?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_contains_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_ends_with?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_gt?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_gte?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  tributeTokenSymbol_lt?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_lte?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_contains?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  tributeTokenSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_starts_with?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tributeToken_contains?: InputMaybe<Scalars['Bytes']>;
  tributeToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tributeToken_not?: InputMaybe<Scalars['Bytes']>;
  tributeToken_not_contains?: InputMaybe<Scalars['Bytes']>;
  tributeToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  votingEnds?: InputMaybe<Scalars['BigInt']>;
  votingEnds_gt?: InputMaybe<Scalars['BigInt']>;
  votingEnds_gte?: InputMaybe<Scalars['BigInt']>;
  votingEnds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingEnds_lt?: InputMaybe<Scalars['BigInt']>;
  votingEnds_lte?: InputMaybe<Scalars['BigInt']>;
  votingEnds_not?: InputMaybe<Scalars['BigInt']>;
  votingEnds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriod?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_not?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingStarts?: InputMaybe<Scalars['BigInt']>;
  votingStarts_gt?: InputMaybe<Scalars['BigInt']>;
  votingStarts_gte?: InputMaybe<Scalars['BigInt']>;
  votingStarts_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingStarts_lt?: InputMaybe<Scalars['BigInt']>;
  votingStarts_lte?: InputMaybe<Scalars['BigInt']>;
  votingStarts_not?: InputMaybe<Scalars['BigInt']>;
  votingStarts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesBalance?: InputMaybe<Scalars['BigInt']>;
  yesBalance_gt?: InputMaybe<Scalars['BigInt']>;
  yesBalance_gte?: InputMaybe<Scalars['BigInt']>;
  yesBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesBalance_lt?: InputMaybe<Scalars['BigInt']>;
  yesBalance_lte?: InputMaybe<Scalars['BigInt']>;
  yesBalance_not?: InputMaybe<Scalars['BigInt']>;
  yesBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesVotes?: InputMaybe<Scalars['BigInt']>;
  yesVotes_gt?: InputMaybe<Scalars['BigInt']>;
  yesVotes_gte?: InputMaybe<Scalars['BigInt']>;
  yesVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesVotes_lt?: InputMaybe<Scalars['BigInt']>;
  yesVotes_lte?: InputMaybe<Scalars['BigInt']>;
  yesVotes_not?: InputMaybe<Scalars['BigInt']>;
  yesVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
}

export type Proposal_OrderBy =
  | 'actionFailed'
  | 'cancelled'
  | 'contentURI'
  | 'contentURIType'
  | 'createdAt'
  | 'createdBy'
  | 'dao'
  | 'description'
  | 'details'
  | 'expiration'
  | 'graceEnds'
  | 'id'
  | 'maxTotalSharesAndLootAtYesVote'
  | 'noBalance'
  | 'noVotes'
  | 'passed'
  | 'prevProposalId'
  | 'processed'
  | 'proposalData'
  | 'proposalDataHash'
  | 'proposalId'
  | 'proposalOffering'
  | 'proposalType'
  | 'selfSponsor'
  | 'sponsor'
  | 'sponsored'
  | 'title'
  | 'tributeEscrowRecipient'
  | 'tributeOffered'
  | 'tributeToken'
  | 'tributeTokenDecimals'
  | 'tributeTokenSymbol'
  | 'votes'
  | 'votingEnds'
  | 'votingPeriod'
  | 'votingStarts'
  | 'yesBalance'
  | 'yesVotes';

export interface Query {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  dao?: Maybe<Dao>;
  daos: Array<Dao>;
  eventTransaction?: Maybe<EventTransaction>;
  eventTransactions: Array<EventTransaction>;
  member?: Maybe<Member>;
  members: Array<Member>;
  metaData?: Maybe<MetaData>;
  metaDatas: Array<MetaData>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  rageQuit?: Maybe<RageQuit>;
  rageQuits: Array<RageQuit>;
  shaman?: Maybe<Shaman>;
  shamans: Array<Shaman>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
}

export interface Query_MetaArgs {
  block?: InputMaybe<Block_Height>;
}

export interface QueryDaoArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryDaosArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Dao_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dao_Filter>;
}

export interface QueryEventTransactionArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryEventTransactionsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EventTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EventTransaction_Filter>;
}

export interface QueryMemberArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryMembersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Member_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Member_Filter>;
}

export interface QueryMetaDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryMetaDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MetaData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MetaData_Filter>;
}

export interface QueryProposalArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryProposalsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
}

export interface QueryRageQuitArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryRageQuitsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RageQuit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RageQuit_Filter>;
}

export interface QueryShamanArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryShamansArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Shaman_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Shaman_Filter>;
}

export interface QueryVoteArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryVotesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
}

export interface RageQuit {
  __typename?: 'RageQuit';
  createdAt: Scalars['String'];
  dao: Dao;
  id: Scalars['ID'];
  loot: Scalars['BigInt'];
  member: Member;
  shares: Scalars['BigInt'];
  to: Scalars['Bytes'];
  tokens: Array<Scalars['Bytes']>;
}

export interface RageQuit_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['String']>;
  createdAt_contains?: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_gt?: InputMaybe<Scalars['String']>;
  createdAt_gte?: InputMaybe<Scalars['String']>;
  createdAt_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt?: InputMaybe<Scalars['String']>;
  createdAt_lte?: InputMaybe<Scalars['String']>;
  createdAt_not?: InputMaybe<Scalars['String']>;
  createdAt_not_contains?: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao?: InputMaybe<Scalars['String']>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  loot?: InputMaybe<Scalars['BigInt']>;
  loot_gt?: InputMaybe<Scalars['BigInt']>;
  loot_gte?: InputMaybe<Scalars['BigInt']>;
  loot_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loot_lt?: InputMaybe<Scalars['BigInt']>;
  loot_lte?: InputMaybe<Scalars['BigInt']>;
  loot_not?: InputMaybe<Scalars['BigInt']>;
  loot_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  member?: InputMaybe<Scalars['String']>;
  member_contains?: InputMaybe<Scalars['String']>;
  member_contains_nocase?: InputMaybe<Scalars['String']>;
  member_ends_with?: InputMaybe<Scalars['String']>;
  member_ends_with_nocase?: InputMaybe<Scalars['String']>;
  member_gt?: InputMaybe<Scalars['String']>;
  member_gte?: InputMaybe<Scalars['String']>;
  member_in?: InputMaybe<Array<Scalars['String']>>;
  member_lt?: InputMaybe<Scalars['String']>;
  member_lte?: InputMaybe<Scalars['String']>;
  member_not?: InputMaybe<Scalars['String']>;
  member_not_contains?: InputMaybe<Scalars['String']>;
  member_not_contains_nocase?: InputMaybe<Scalars['String']>;
  member_not_ends_with?: InputMaybe<Scalars['String']>;
  member_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  member_not_in?: InputMaybe<Array<Scalars['String']>>;
  member_not_starts_with?: InputMaybe<Scalars['String']>;
  member_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  member_starts_with?: InputMaybe<Scalars['String']>;
  member_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shares?: InputMaybe<Scalars['BigInt']>;
  shares_gt?: InputMaybe<Scalars['BigInt']>;
  shares_gte?: InputMaybe<Scalars['BigInt']>;
  shares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_lt?: InputMaybe<Scalars['BigInt']>;
  shares_lte?: InputMaybe<Scalars['BigInt']>;
  shares_not?: InputMaybe<Scalars['BigInt']>;
  shares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_not?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type RageQuit_OrderBy =
  | 'createdAt'
  | 'dao'
  | 'id'
  | 'loot'
  | 'member'
  | 'shares'
  | 'to'
  | 'tokens';

export interface Shaman {
  __typename?: 'Shaman';
  createdAt: Scalars['String'];
  dao: Dao;
  id: Scalars['ID'];
  permissions: Scalars['BigInt'];
  shamanAddress: Scalars['Bytes'];
}

export interface Shaman_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['String']>;
  createdAt_contains?: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_gt?: InputMaybe<Scalars['String']>;
  createdAt_gte?: InputMaybe<Scalars['String']>;
  createdAt_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt?: InputMaybe<Scalars['String']>;
  createdAt_lte?: InputMaybe<Scalars['String']>;
  createdAt_not?: InputMaybe<Scalars['String']>;
  createdAt_not_contains?: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao?: InputMaybe<Scalars['String']>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  permissions?: InputMaybe<Scalars['BigInt']>;
  permissions_gt?: InputMaybe<Scalars['BigInt']>;
  permissions_gte?: InputMaybe<Scalars['BigInt']>;
  permissions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  permissions_lt?: InputMaybe<Scalars['BigInt']>;
  permissions_lte?: InputMaybe<Scalars['BigInt']>;
  permissions_not?: InputMaybe<Scalars['BigInt']>;
  permissions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shamanAddress?: InputMaybe<Scalars['Bytes']>;
  shamanAddress_contains?: InputMaybe<Scalars['Bytes']>;
  shamanAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shamanAddress_not?: InputMaybe<Scalars['Bytes']>;
  shamanAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  shamanAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type Shaman_OrderBy =
  | 'createdAt'
  | 'dao'
  | 'id'
  | 'permissions'
  | 'shamanAddress';

export interface Subscription {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  dao?: Maybe<Dao>;
  daos: Array<Dao>;
  eventTransaction?: Maybe<EventTransaction>;
  eventTransactions: Array<EventTransaction>;
  member?: Maybe<Member>;
  members: Array<Member>;
  metaData?: Maybe<MetaData>;
  metaDatas: Array<MetaData>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  rageQuit?: Maybe<RageQuit>;
  rageQuits: Array<RageQuit>;
  shaman?: Maybe<Shaman>;
  shamans: Array<Shaman>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
}

export interface Subscription_MetaArgs {
  block?: InputMaybe<Block_Height>;
}

export interface SubscriptionDaoArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionDaosArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Dao_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dao_Filter>;
}

export interface SubscriptionEventTransactionArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionEventTransactionsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EventTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EventTransaction_Filter>;
}

export interface SubscriptionMemberArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionMembersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Member_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Member_Filter>;
}

export interface SubscriptionMetaDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionMetaDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MetaData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MetaData_Filter>;
}

export interface SubscriptionProposalArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionProposalsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
}

export interface SubscriptionRageQuitArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionRageQuitsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RageQuit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RageQuit_Filter>;
}

export interface SubscriptionShamanArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionShamansArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Shaman_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Shaman_Filter>;
}

export interface SubscriptionVoteArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionVotesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
}

export interface Vote {
  __typename?: 'Vote';
  approved: Scalars['Boolean'];
  balance: Scalars['BigInt'];
  createdAt: Scalars['String'];
  daoAddress: Scalars['Bytes'];
  id: Scalars['ID'];
  member: Member;
  proposal: Proposal;
}

export interface Vote_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  approved?: InputMaybe<Scalars['Boolean']>;
  approved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  approved_not?: InputMaybe<Scalars['Boolean']>;
  approved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt?: InputMaybe<Scalars['String']>;
  createdAt_contains?: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_gt?: InputMaybe<Scalars['String']>;
  createdAt_gte?: InputMaybe<Scalars['String']>;
  createdAt_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt?: InputMaybe<Scalars['String']>;
  createdAt_lte?: InputMaybe<Scalars['String']>;
  createdAt_not?: InputMaybe<Scalars['String']>;
  createdAt_not_contains?: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with?: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt_starts_with?: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  daoAddress?: InputMaybe<Scalars['Bytes']>;
  daoAddress_contains?: InputMaybe<Scalars['Bytes']>;
  daoAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  daoAddress_not?: InputMaybe<Scalars['Bytes']>;
  daoAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  daoAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  member?: InputMaybe<Scalars['String']>;
  member_contains?: InputMaybe<Scalars['String']>;
  member_contains_nocase?: InputMaybe<Scalars['String']>;
  member_ends_with?: InputMaybe<Scalars['String']>;
  member_ends_with_nocase?: InputMaybe<Scalars['String']>;
  member_gt?: InputMaybe<Scalars['String']>;
  member_gte?: InputMaybe<Scalars['String']>;
  member_in?: InputMaybe<Array<Scalars['String']>>;
  member_lt?: InputMaybe<Scalars['String']>;
  member_lte?: InputMaybe<Scalars['String']>;
  member_not?: InputMaybe<Scalars['String']>;
  member_not_contains?: InputMaybe<Scalars['String']>;
  member_not_contains_nocase?: InputMaybe<Scalars['String']>;
  member_not_ends_with?: InputMaybe<Scalars['String']>;
  member_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  member_not_in?: InputMaybe<Array<Scalars['String']>>;
  member_not_starts_with?: InputMaybe<Scalars['String']>;
  member_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  member_starts_with?: InputMaybe<Scalars['String']>;
  member_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_contains?: InputMaybe<Scalars['String']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_ends_with?: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_gt?: InputMaybe<Scalars['String']>;
  proposal_gte?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_lt?: InputMaybe<Scalars['String']>;
  proposal_lte?: InputMaybe<Scalars['String']>;
  proposal_not?: InputMaybe<Scalars['String']>;
  proposal_not_contains?: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_starts_with?: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
}

export type Vote_OrderBy =
  | 'approved'
  | 'balance'
  | 'createdAt'
  | 'daoAddress'
  | 'id'
  | 'member'
  | 'proposal';

export interface _Block_ {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
}

/** The type for the top-level _meta field */
export interface _Meta_ {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
}

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';
