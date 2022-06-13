// REFACTOR CONSTANTS TO ENDPOINTS
import { LOCAL_ABI } from '@daohaus/abi-utilities';
import {
  encodeFunction,
  encodeValues,
  getNonce,
  isArray,
  isNumberish,
  isString,
  toBaseUnits,
} from '@daohaus/common-utilities';
import { ethers, providers } from 'ethers';
import { FORM_KEYS } from './formKeys';

const SHARE_SINGLETON = '0xE4B40ea347Dffe40b5d0d562bF873d830C124643';
const LOOT_SINGLETON = '0x29FF7b9C945158CCD973B7c190a73AB9e110Fc74';
const BAAL_FACTORY = '0x1b94221EB2bC8dc9F16660EA5be9dcd92b0ae862';
const GNOSIS_MULTISEND = '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761';
const POSTER = '0x000000000000cd17345801aa8147b8d3950260ff';

const tokenConfigTX = (formValues: Record<string, unknown>) => {
  const pauseVoteToken = !formValues.votingTransferable;
  const pauseNvToken = !formValues.votingTransferable;

  return encodeFunction(LOCAL_ABI.BAAL, 'setAdminConfig', [
    pauseVoteToken,
    pauseNvToken,
  ]);
};

const governanceConfigTX = (formValues: Record<string, unknown>) => {
  const votingSeconds = formValues[FORM_KEYS.VOTING_SECONDS];
  const graceSeconds = formValues[FORM_KEYS.GRACE_SECONDS];
  const newOffering = formValues[FORM_KEYS.OFFERING];
  const minRetention = formValues[FORM_KEYS.MIN_RETENTION];
  const quorum = formValues[FORM_KEYS.QUORUM];
  const sponsorThreshold = formValues[FORM_KEYS.SPONSOR_THRESHOLD];

  if (
    !isNumberish(votingSeconds) ||
    !isNumberish(graceSeconds) ||
    !isNumberish(newOffering) ||
    !isNumberish(quorum) ||
    !isNumberish(sponsorThreshold) ||
    !isNumberish(minRetention)
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'governanceConfigTX recieved arguments in the wrong shape or type'
    );
  }
  const encodedValues = encodeValues(
    ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
    [
      votingSeconds,
      graceSeconds,
      newOffering,
      quorum,
      sponsorThreshold,
      minRetention,
    ]
  );
  return encodeFunction(LOCAL_ABI.BAAL, 'setGovernanceConfig', [encodedValues]);
};

export const shamanConfigTX = (formValues: Record<string, unknown>) => {
  const shamanData = formValues[FORM_KEYS.SHAMANS] as
    | Record<string, unknown>
    | '';

  if (shamanData === '') {
    return encodeFunction(LOCAL_ABI.BAAL, 'setShamans', [[], []]);
  }
  if (
    !isArray(shamanData?.shamanAddresses) ||
    shamanData.shamanAddresses.some((addr) => !isString(addr)) ||
    !isArray(shamanData?.shamanPermissions) ||
    shamanData.shamanPermissions.some((addr) => !isNumberish(addr))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'shamanConfigTX recieved arguments in the wrong shape or type'
    );
  }
  return encodeFunction(LOCAL_ABI.BAAL, 'setShamans', [
    shamanData.shamanAddresses,
    shamanData.shamanPermissions,
  ]);
};

export const shareConfigTX = (formValues: Record<string, unknown>) => {
  const memberData = formValues[FORM_KEYS.MEMBERS] as Record<string, unknown>;

  if (
    !isArray(memberData?.memberAddresses) ||
    memberData.memberAddresses.some((addr) => !isString(addr)) ||
    !isArray(memberData?.memberShares) ||
    memberData.memberShares.some((shares) => !isNumberish(shares))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'shareConfigTX recieved arguments in the wrong shape or type'
    );
  }

  const wholeShareAmts = memberData.memberShares as (string | number)[];
  const sharesInBaseUnits = wholeShareAmts.map((shares) =>
    toBaseUnits(shares.toString())
  );
  return encodeFunction(LOCAL_ABI.BAAL, 'mintShares', [
    memberData.memberAddresses,
    sharesInBaseUnits,
  ]);
};

export const lootConfigTX = (formValues: Record<string, unknown>) => {
  const memberData = (formValues[FORM_KEYS.MEMBERS] || {}) as Record<
    string,
    unknown
  >;

  if (
    !isArray(memberData?.memberAddresses) ||
    memberData.memberAddresses.some((addr) => !isString(addr)) ||
    !isArray(memberData?.memberLoot) ||
    memberData.memberLoot.some((loot) => !isNumberish(loot))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'shareConfigTX recieved arguments in the wrong shape or type'
    );
  }

  const wholeLootAmts = memberData.memberLoot as (string | number)[];
  const lootInBaseUnits = wholeLootAmts.map((loot) =>
    toBaseUnits(loot.toString())
  );
  return encodeFunction(LOCAL_ABI.BAAL, 'mintLoot', [
    memberData.memberAddresses,
    lootInBaseUnits,
  ]);
};

const metadataConfigTX = (formValues: Record<string, unknown>) => {
  const daoName = formValues[FORM_KEYS.DAO_NAME];
  if (!isString(daoName)) {
    console.log('ERROR: Form Values', formValues);
    throw new Error('metadataTX recieved arguments in the wrong shape or type');
  }

  const METADATA = encodeFunction(LOCAL_ABI.POSTER, 'post', [
    JSON.stringify({ name: daoName }),
    'daohaus.metadata.summoner',
  ]);
  console.log('METADATA', METADATA);
  return encodeFunction(LOCAL_ABI.BAAL, 'executeAsBaal', [POSTER, 0, METADATA]);
};

export const assembleTxArgs = (formValues: Record<string, unknown>) => {
  const tokenName = formValues[FORM_KEYS.TOKEN_NAME];
  const tokenSymbol = formValues[FORM_KEYS.TOKEN_SYMBOL];

  if (!isString(tokenName) || !isString(tokenSymbol)) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'assembleSummonTx recieved arguments in the wrong shape or type'
    );
  }
  const initParams = encodeValues(
    ['string', 'string', 'address', 'address', 'address'],
    [tokenName, tokenSymbol, SHARE_SINGLETON, LOOT_SINGLETON, GNOSIS_MULTISEND]
  );
  const initActions = [
    tokenConfigTX(formValues),
    governanceConfigTX(formValues),
    shamanConfigTX(formValues),
    shareConfigTX(formValues),
    lootConfigTX(formValues),
    metadataConfigTX(formValues),
  ];
  const args = [initParams, initActions, getNonce()];

  return args;
};

export const summon = async (
  provider: providers.Web3Provider,
  formValues: Record<string, unknown>
) => {
  try {
    const contract = new ethers.Contract(
      BAAL_FACTORY,
      LOCAL_ABI.BAAL_FACTORY,
      provider.getSigner()
    );
    const args = assembleTxArgs(formValues);
    console.log('args', args);
    return await contract.functions.summonBaalAndSafe(...args);
  } catch (error) {
    console.log(error);
  }
};
