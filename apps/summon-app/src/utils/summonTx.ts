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
import { FormValues } from '../types/form';
import { FORM_KEYS } from './formKeys';

const tokenConfigTX = (formValues: FormValues) => {
  const pauseVoteToken = !formValues.votingTransferable;
  const pauseNvToken = !formValues.votingTransferable;

  return encodeFunction(LOCAL_ABI.BAAL, 'setAdminConfig', [
    pauseVoteToken,
    pauseNvToken,
  ]);
};

const governanceConfigTX = (formValues: FormValues) => {
  const {
    votingPeriodInSeconds,
    gracePeriodInSeconds,
    newOffering,
    quorum,
    sponsorThreshold,
    minRetention,
  } = formValues;

  if (
    !isNumberish(votingPeriodInSeconds) ||
    !isNumberish(gracePeriodInSeconds) ||
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
      votingPeriodInSeconds,
      gracePeriodInSeconds,
      newOffering,
      quorum,
      sponsorThreshold,
      minRetention,
    ]
  );
  return encodeFunction(LOCAL_ABI.BAAL, 'setGovernanceConfig', [encodedValues]);
};

export const shamanConfigTX = (formValues: FormValues) => {
  const { shamans } = formValues;

  if (shamans === '' || !shamans) {
    return encodeFunction(LOCAL_ABI.BAAL, 'setShamans', [[], []]);
  }
  if (
    !isArray(shamans?.shamanAddresses) ||
    shamans.shamanAddresses.some((addr) => !isString(addr)) ||
    !isArray(shamans?.shamanPermissions) ||
    shamans.shamanPermissions.some((addr) => !isNumberish(addr))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'shamanConfigTX recieved arguments in the wrong shape or type'
    );
  }
  return encodeFunction(LOCAL_ABI.BAAL, 'setShamans', [
    shamans.shamanAddresses,
    shamans.shamanPermissions,
  ]);
};

export const shareConfigTX = (formValues: FormValues) => {
  const { members } = formValues;

  if (
    !members ||
    !isArray(members?.memberAddresses) ||
    members.memberAddresses.some((addr) => !isString(addr)) ||
    !isArray(members?.memberShares) ||
    members.memberShares.some((shares) => !isNumberish(shares))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'shareConfigTX recieved arguments in the wrong shape or type'
    );
  }

  const wholeShareAmts = members.memberShares;
  const sharesInBaseUnits = wholeShareAmts.map((shares) => toBaseUnits(shares));
  return encodeFunction(LOCAL_ABI.BAAL, 'mintShares', [
    members.memberAddresses,
    sharesInBaseUnits,
  ]);
};

export const lootConfigTX = (formValues: FormValues) => {
  const { members } = formValues;

  if (
    !members ||
    !isArray(members?.memberAddresses) ||
    members.memberAddresses.some((addr) => !isString(addr)) ||
    !isArray(members?.memberShares) ||
    members.memberShares.some((shares) => !isNumberish(shares))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'shareConfigTX recieved arguments in the wrong shape or type'
    );
  }

  const wholeLootAmts = members.memberLoot;
  const lootInBaseUnits = wholeLootAmts.map((loot) =>
    toBaseUnits(loot.toString())
  );
  return encodeFunction(LOCAL_ABI.BAAL, 'mintLoot', [
    members.memberAddresses,
    lootInBaseUnits,
  ]);
};

const metadataConfigTX = (formValues: FormValues, posterAddress: string) => {
  const { daoName } = formValues;
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
    return {
      V3_FACTORY: V3_FACTORY[chainId] || '',
      V3_LOOT_SINGLETON: V3_LOOT_SINGLETON[chainId] || '',
      V3_SHARE_SINGLETON: V3_SHARE_SINGLETON[chainId] || '',
      GNOSIS_MULTISEND: GNOSIS_MULTISEND[chainId] || '',
      POSTER: POSTER[chainId] || '',
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
