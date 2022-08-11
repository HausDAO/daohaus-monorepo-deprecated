import { JsonFragment } from '@ethersproject/abi';
import { ethers, providers } from 'ethers';
import { ABI, Keychain, ValidNetwork } from '@daohaus/common-utilities';
import { getCachedABI } from './cache';

const isGnosisProxy = (abi: ABI) => {
  return (
    abi.length === 2 &&
    abi.every((fn) => ['constructor', 'fallback'].includes(fn?.type as string))
  );
};
const isSuperfluidProxy = (abi: ABI) => {
  return abi.length === 3 && abi.some((fn) => fn.name === 'initializeProxy');
};
export const isProxyABI = (abi: ABI) => {
  if (abi?.length) {
    return abi.some((fn) => fn.name === 'implementation');
  }
  return false;
};

export const TEMPORARY_RPC = {
  '0x5': `https://goerli.infura.io/v3/${
    import.meta.env.VITE_INFURA_PROJECT_ID
  }`,
};

export const createContract = ({
  address,
  abi,
  chainId,
  rpcs,
}: {
  address: string;
  abi: ABI;
  chainId: ValidNetwork;
  rpcs: Keychain;
}) => {
  const rpcUrl = rpcs[chainId];
  console.log('rpcUrl', rpcUrl);
  const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
  return new ethers.Contract(address, abi, ethersProvider);
};

export const getImplementation = async ({
  address,
  chainId,
  abi,
  rpcs = TEMPORARY_RPC,
}: {
  address: string;
  chainId: ValidNetwork;
  abi: ABI;
  rpcs?: Keychain;
}) => {
  const ethersContract = createContract({
    address,
    abi,
    chainId,
    rpcs,
  });
  const newAddress = await ethersContract?.['implementation']?.();
  return newAddress;
};

const fetchABI = async ({
  address,
  chainId,
  rpcs = TEMPORARY_RPC,
  parseJSON,
}: {
  address: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  parseJSON: boolean;
}) => {
  const cachedABI = await getCachedABI({ address, chainId });
};
