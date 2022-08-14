import { JSONDetailsSearch } from '@daohaus/common-utilities';
import { BAAL_ABI } from '@daohaus/contract-utilities';

export const EXPIRY = '.expiry';
export const FORM = '.formData';
export const CURRENT_DAO = '.daoId';
export const BaalContractBase = {
  type: 'local',
  contractName: 'Baal',
  abi: BAAL_ABI,
};

export const basicDetails: JSONDetailsSearch = {
  type: 'JSONDetails',
  jsonSchema: {
    title: '.formValues.title',
    description: '.formValues.description',
    proposalType: { type: 'static', value: 'Multicall Proposal' },
  },
};
