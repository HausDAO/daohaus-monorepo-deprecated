import {
  StaticContract,
  ProcessedContract,
  TXLego,
  ValidNetwork,
} from '@daohaus/common-utilities';

const processLocalContract = ({
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

export const processContractLego = ({
  tx,
  chainId,
}: {
  tx: TXLego;
  chainId: ValidNetwork;
}) => {
  const { contract } = tx;
  if (contract.type === 'static') {
    return processLocalContract({
      localContract: contract as StaticContract,
      chainId,
    });
  }
  if (contract.type === 'processed') {
    return contract as ProcessedContract;
  }
  // This is a placeholder for when we implemnt the arbitary
  // contract call and cache utilities
  // https://github.com/HausDAO/daohaus-monorepo/issues/403
  throw new Error('ABI not found. Remote fetching not implemented');
};
