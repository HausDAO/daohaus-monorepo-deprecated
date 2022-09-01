import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { CONTRACTS } from '@daohaus/common-utilities';
import { ContractLego } from '@daohaus/ethers-utilities';

export const CONTRACT: Record<string, ContractLego> = {
  POSTER: {
    type: 'static',
    contractName: 'Poster',
    abi: LOCAL_ABI.POSTER,
    targetAddress: {
      '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
      '0x64': '0x000000000000cd17345801aa8147b8d3950260ff',
    },
  },
  ERC_20: {
    type: 'static',
    contractName: 'ERC20',
    abi: LOCAL_ABI.ERC20,
    targetAddress: '.tokenAddress',
  },
  ERC_20_FUNDING: {
    type: 'static',
    contractName: 'ERC20',
    abi: LOCAL_ABI.ERC20,
    targetAddress: '.formValues.paymentTokenAddress',
  },
  CURRENT_DAO: {
    type: 'static',
    contractName: 'Current DAO (Baal)',
    abi: LOCAL_ABI.BAAL,
    targetAddress: '.daoId',
  },
  TRIBUTE_MINION: {
    type: 'static',
    contractName: 'Tribute Minion',
    abi: LOCAL_ABI.TRIBUTE_MINION,
    targetAddress: CONTRACTS.TRIBUTE_MINION,
  },
};
