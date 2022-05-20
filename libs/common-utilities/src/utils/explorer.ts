import { ENDPOINTS } from '../constants';
import { ValidNetwork } from '../types';

export const generateExplorerLink = ({
  chainId,
  address,
}: {
  chainId: ValidNetwork;
  address?: string;
}) => `${ENDPOINTS['EXPLORER'][chainId]}${'/address/' + address || ''}`;
