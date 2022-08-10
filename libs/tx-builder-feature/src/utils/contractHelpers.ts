import {
  GNOSIS_MULTISEND_ABI,
  BAAL_ABI,
  BAAL_SUMMONER_ABI,
  LOOT_ABI,
  SHARES_ABI,
  POSTER_ABI,
  TRIBUTE_MINION_ABI,
} from '@daohaus/contract-utilities';
import {
  StaticContract,
  ProcessedContract,
  ValidNetwork,
  LocalContract,
  ContractLego,
  ABI,
} from '@daohaus/common-utilities';

const processStaticContract = ({
  localContract,
  chainId,
}: {
  localContract: StaticContract;
  chainId: ValidNetwork;
}): ProcessedContract => {
  const { keychain, abi, contractName } = localContract;
  const address = keychain[chainId];
  if (!address) {
    throw new Error(
      `No address found for contract ${contractName} on ${chainId}`
    );
  }
  return {
    type: 'processed',
    abi,
    address,
    contractName,
  };
};

const LOCAL_ABI: Record<string, ABI> = {
  GNOSIS_MULTISEND_ABI,
  BAAL_ABI,
  BAAL_SUMMONER_ABI,
  LOOT_ABI,
  SHARES_ABI,
  POSTER_ABI,
  TRIBUTE_MINION_ABI,
};

const processLocalContract = ({
  localContract,
  chainId,
}: {
  localContract: LocalContract;
  chainId: ValidNetwork;
}): ProcessedContract => {
  const { keychain, contractName } = localContract;
  const abi = LOCAL_ABI[contractName] as ABI;
  const address = keychain[chainId];
  if (!address) {
    throw new Error(
      `No address found for contract ${contractName} on ${chainId}`
    );
  }
  return {
    type: 'processed',
    abi,
    address,
    contractName,
  };
};

export const processContractLego = async ({
  contract,
  chainId,
}: {
  contract: ContractLego;
  chainId: ValidNetwork;
}) => {
  if (contract.type === 'static') {
    return processStaticContract({
      localContract: contract as StaticContract,
      chainId,
    });
  }

  if (contract.type === 'local') {
    return processLocalContract({
      localContract: contract as LocalContract,
      chainId,
    });
  }

  if (contract.type === 'processed') {
    return contract;
  }
  // This is a placeholder for when we implemnt the arbitary
  // contract call and cache utilities
  // https://github.com/HausDAO/daohaus-monorepo/issues/403
  throw new Error('ABI not found. Remote fetching not implemented');
};
