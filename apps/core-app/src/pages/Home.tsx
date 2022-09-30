import {
  handleErrorMessage,
  isValidNetwork,
  NETWORK_DATA,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { H1, Spinner, useDebounce, useToast } from '@daohaus/ui';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { HomeDashboard } from '../components/HomeDashboard';
import { HomeNotConnected } from '../components/HomeNotConnected';
import { getDelegateFilter, SORT_FIELDS } from '../utils/hub';

const defaultNetworks = Object.keys(NETWORK_DATA).reduce(
  (acc, networkId) => ({ ...acc, [networkId]: networkId }),
  {}
);
export const DEFAULT_SORT_KEY = 'PROPOSALS';

export function Home() {
  const { isConnected, isConnecting, address } = useHausConnect();

  return isConnected ? <HomeDashboard /> : <HomeNotConnected />;
}

export default Home;
