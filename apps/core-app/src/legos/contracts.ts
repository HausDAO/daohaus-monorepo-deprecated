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
};
