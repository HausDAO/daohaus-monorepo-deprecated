// REFACTOR CONSTANTS TO ENDPOINTS
import { LOCAL_ABI } from '@daohaus/abi-utilities';
import {
  encodeFunction,
  encodeValues,
  isBoolean,
} from '@daohaus/common-utilities';
import { FORM_KEYS } from './formKeys';

const BAAL_FACTORY = ' 0x1b94221EB2bC8dc9F16660EA5be9dcd92b0ae862';
const GNOSIS_MULTISEND = '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761';
const POSTER = ' 0x000000000000cd17345801aa8147b8d3950260ff';

const ADMIN_CONFIG = {
  CONTRACT: LOCAL_ABI.BAAL,
  ACTION: 'setAdminConfig',
  ARGS: [
    // PAUSE SHARES,
    // PAUSE LOOT
  ],
};
const GOVERNANCE_CONFIG = {
  CONTRACT: LOCAL_ABI.BAAL,
  ACTION: 'setGovernanceConfig',
  ARGS: [
    encodeValues(
      ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
      [
        120, // Voting in seconds
        60, // GracePeriod in seconds
        0, // Proposal offering,
        0, // Offering
        2, // Sponsor Threshold
        66, // Min retention
      ]
    ),
  ],
};
const SHAMAN_CONFIG = {
  CONTRACT: LOCAL_ABI.BAAL,
  ACTION: 'setShamans',
  ARGS: [
    [], // shamans, array of addresses
    [], //permissions, array of numbers
  ],
};
const SHARES_CONFIG = {
  CONTRACT: LOCAL_ABI.BAAL,
  ACTION: 'mintShares',
  ARGS: [
    [], // members Array of addresses,
    [], // amt, array of numbers,
  ],
};
const LOOT_CONFIG = {
  CONTRACT: LOCAL_ABI.BAAL,
  ACTION: 'mintLoot',
  ARGS: [
    [], // members  array
    [], // amt, array of numbers
  ],
};

const METADATA = encodeFunction(LOCAL_ABI.POSTER, 'post', [
  JSON.stringify({ name: 'Salty Nonce DAO' }),
  'daohaus.metadata.summoner',
]);

const METADATA_CONFIG = {
  CONTRACT: LOCAL_ABI.BAAL,
  ACTION: 'executeAsBaal',
  ARGS: [POSTER, 0, METADATA],
};

const getInitActions = (formValues: Record<string, unknown>) => {
  const pauseVoteToken = isBoolean(formValues[FORM_KEYS.VOTE_TOKEN_TRANSFER])
    ? !!formValues.votingTransferable
    : true;
  const pauseNvToken = isBoolean(formValues[FORM_KEYS.NV_TOKEN_TRANSFER])
    ? !!formValues.votingTransferable
    : true;

  return [{ ...ADMIN_CONFIG, ARGS: [] }];
};

export const assembleSummonTx = {};
