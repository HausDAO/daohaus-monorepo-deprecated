import { TXLego } from '@daohaus/common-utilities';

export const handleContractLego = ({ tx }: { tx: TXLego }) => {
  if (tx.contract.type === 'local') {
    return tx.contract;
  }

  // This is a placeholder for when we implemnt the arbitary
  // contract call and cache utilities
  // https://github.com/HausDAO/daohaus-monorepo/issues/403
  throw new Error('ABI not found. Remote fetching not implemented');
};
