import { Keychain } from '@daohaus/common-utilities';

export type resolvedMembership = {
  dao: string;
  name?: string;
  activeProposalCount: number;
  activeMemberCount: string;
  votingPower: number;
  networkId?: keyof Keychain;
  delegate?: string;
  isDelegate: boolean;
  memberAddress: string;
};

export interface resovledMembershipsQuery {
  daos: resolvedMembership[];
}
