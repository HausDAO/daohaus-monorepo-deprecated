import { ABI, ArbitraryState, ValidNetwork } from '@daohaus/common-utilities';
import localforage from 'localforage';

const defaultABIStore = {
  '0x1': {},
  '0x4': {},
  '0x5': {},
  '0x2a': {},
  '0xa': {},
  '0x64': {},
  '0x89': {},
  '0xa4b1': {},
  '0xa4ec': {},
};

enum StoreName {
  ABI = 'ABI',
}
const getlocalForage = async (storeName: StoreName) => {
  try {
    const store = await localforage.getItem(storeName);
    return store;
  } catch (error) {
    console.error(error);
  }
};
export const getABIstore = async () =>
  (await getlocalForage(StoreName.ABI)) as ArbitraryState;

export const getCachedABI = async ({
  address,
  chainId,
}: {
  address: string;
  chainId: ValidNetwork;
}) => {
  const abiStore = await getABIstore();
  const abi = abiStore?.[chainId]?.[address] as ABI | undefined;
  return abi;
};

const addABI = ({
  abiStore,
  chainId,
  address,
  abi,
}: {
  abiStore: ArbitraryState;
  chainId: ValidNetwork;
  address: string;
  abi: ABI;
}) => {
  console.log('address', address);
  console.log('abi', abi);
  console.log('chainId', chainId);
  console.log('abiStore', abiStore);
  return {
    ...abiStore,
    [chainId]: {
      ...abiStore[chainId],
      [address]: abi,
    },
  };
};

export const cacheABI = async ({
  address,
  chainId,
  abi,
}: {
  address: string;
  chainId: ValidNetwork;
  abi: ABI;
}) => {
  const abiStore = await getABIstore();
  console.log('abiStore', abiStore);
  const newStore = addABI({
    abiStore,
    chainId,
    address,
    abi,
  });
  try {
    await localforage.setItem(StoreName.ABI, newStore);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const initABIs = async () => {
  localforage.config({
    // driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    name: 'DAOhaus',
    version: 3.0, // size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'Universal DH Cache', // Should be alphanumeric, with underscores.
    description:
      'Store for DH apps. Used for caching ABIs, member Profiles, and other data.',
  });
  const store = await getABIstore();
  if (!store) {
    localforage.setItem(StoreName.ABI, defaultABIStore);
  }
};

initABIs();
