import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { ContractLego } from '@daohaus/common-utilities';

export const CONTRACT: Record<string, ContractLego> = {
  POSTER: {
    type: 'static',
    contractName: 'Poster',
    abi: LOCAL_ABI.POSTER,
    targetAddress: {
      '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
    },
  },
  ERC_20: {
    type: 'static',
    contractName: 'ERC20',
    abi: LOCAL_ABI.ERC20,
    targetAddress: '.tokenAddress',
  },
};
