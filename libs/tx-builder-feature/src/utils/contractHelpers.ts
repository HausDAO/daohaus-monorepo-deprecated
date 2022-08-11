import {
  StaticContract,
  ProcessedContract,
  ValidNetwork,
  LocalContract,
  ContractLego,
  ABI,
} from '@daohaus/common-utilities';
import { BAAL_ABI } from '@daohaus/contract-utilities';
import { getImplementation, TEMPORARY_RPC } from './abi';

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

const processLocalContract = ({
  localContract,
  chainId,
  localABIs,
}: {
  localContract: LocalContract;
  chainId: ValidNetwork;
  localABIs: Record<string, ABI>;
}): ProcessedContract => {
  const { keychain, contractName } = localContract;
  const abi = localABIs[contractName];
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
  localABIs,
}: {
  contract: ContractLego;
  chainId: ValidNetwork;
  localABIs: Record<string, ABI>;
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
      localABIs,
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

const test = async () => {
  const res = await getImplementation({
    address: '0xFCeaEc9d2c283d0aaF9F323dC840042a5A5b54E1',
    abi: BAAL_ABI,
    chainId: '0x5',
  });
  console.log('res', res);
};

test();
