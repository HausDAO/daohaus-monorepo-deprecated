// REFACTOR CONSTANTS TO ENDPOINTS
import { LOCAL_ABI } from '@daohaus/abi-utilities';
import {
  CONTRACTS,
  encodeFunction,
  encodeValues,
  getNonce,
  isArray,
  isNumberish,
  isString,
  toBaseUnits,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { ethers, providers } from 'ethers';
import { FORM_KEYS } from './formKeys';

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
  // Review. Typecasting here as validation will not allow the form to be submittied
  // without anything other than the shape seen below.
  // React Hook Form only allows us to shape the functions with Record<string, unknown>

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
  // Review. Typecasting here as validation will not allow the form to be submittied
  // without anything other than the shape seen below.
  // React Hook Form only allows us to shape the functions with Record<string, unknown>

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

  const wholeShareAmts = memberData.memberShares as string[];
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

const metadataConfigTX = (
  formValues: Record<string, unknown>,
  posterAddress: string
) => {
  const daoName = formValues[FORM_KEYS.DAO_NAME];
  if (!isString(daoName)) {
    console.log('ERROR: Form Values', formValues);
    throw new Error('metadataTX recieved arguments in the wrong shape or type');
  }

  const METADATA = encodeFunction(LOCAL_ABI.POSTER, 'post', [
    JSON.stringify({ name: daoName }),
    'daohaus.metadata.summoner',
  ]);

  return encodeFunction(LOCAL_ABI.BAAL, 'executeAsBaal', [
    posterAddress,
    0,
    METADATA,
  ]);
};

const handleKeychains = (chainId: ValidNetwork) => {
  const {
    V3_FACTORY,
    V3_LOOT_SINGLETON,
    V3_SHARE_SINGLETON,
    GNOSIS_MULTISEND,
    POSTER,
  } = CONTRACTS;
  const v3Contracts = [
    V3_FACTORY,
    V3_LOOT_SINGLETON,
    V3_SHARE_SINGLETON,
    GNOSIS_MULTISEND,
    POSTER,
  ];

  if (v3Contracts.every((contract) => contract[chainId])) {
    // REVIEW. Before this conditional statement, each contract
    // was string | undefined. After the conditional statement it can
    // only be string. So I'm typecasting here.
    return {
      V3_FACTORY: V3_FACTORY[chainId] as string,
      V3_LOOT_SINGLETON: V3_LOOT_SINGLETON[chainId] as string,
      V3_SHARE_SINGLETON: V3_SHARE_SINGLETON[chainId] as string,
      GNOSIS_MULTISEND: GNOSIS_MULTISEND[chainId] as string,
      POSTER: POSTER[chainId] as string,
    };
  }
  console.log('v3Contracts', v3Contracts);
  console.log('chainId', chainId);
  throw new Error('Could not find V3 singletons for this network');
};

export const assembleTxArgs = (
  formValues: Record<string, unknown>,
  chainId: ValidNetwork
) => {
  const tokenName = formValues[FORM_KEYS.TOKEN_NAME];
  const tokenSymbol = formValues[FORM_KEYS.TOKEN_SYMBOL];

  if (!isString(tokenName) || !isString(tokenSymbol)) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'assembleSummonTx recieved arguments in the wrong shape or type'
    );
  }

  const { V3_LOOT_SINGLETON, V3_SHARE_SINGLETON, GNOSIS_MULTISEND, POSTER } =
    handleKeychains(chainId);
  const initParams = encodeValues(
    ['string', 'string', 'address', 'address', 'address'],
    [
      tokenName,
      tokenSymbol,
      V3_SHARE_SINGLETON,
      V3_LOOT_SINGLETON,
      GNOSIS_MULTISEND,
    ]
  );
  const initActions = [
    tokenConfigTX(formValues),
    governanceConfigTX(formValues),
    shamanConfigTX(formValues),
    shareConfigTX(formValues),
    lootConfigTX(formValues),
    metadataConfigTX(formValues, POSTER),
  ];
  const args = [initParams, initActions, getNonce()];

  return args;
};

export const summon = async (
  provider: providers.Web3Provider,
  formValues: Record<string, unknown>,
  chainId: ValidNetwork
) => {
  try {
    const baalSummoner = CONTRACTS.V3_FACTORY[chainId];
    if (!baalSummoner) {
      console.log('chainId', chainId);
      console.log('baalSummoner', baalSummoner);
      throw new Error('Could not find V3 summoner for this network');
    }

    const contract = new ethers.Contract(
      baalSummoner,
      LOCAL_ABI.BAAL_FACTORY,
      provider.getSigner()
    );

    const args = assembleTxArgs(formValues, chainId);
    return await contract.functions.summonBaalAndSafe(...args);
  } catch (error) {
    console.log(error);
  }
};
