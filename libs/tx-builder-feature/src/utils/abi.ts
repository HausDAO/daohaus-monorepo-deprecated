import { JsonFragment } from '@ethersproject/abi';
import { ethers, providers } from 'ethers';
import { ABI, isJSON, Keychain, ValidNetwork } from '@daohaus/common-utilities';
import { cacheABI, getCachedABI } from './cache';

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

const ABI_ADDRESS = '<<address>>';

const TEMPORARY_ABI_EXPLORER: Keychain = {
  '0x5': `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${ABI_ADDRESS}&apikey=${
    import.meta.env.VITE_ETHERSCAN_KEY
  }`,
};

const getABIUrl = ({
  chainId,
  contractAddress,
}: {
  chainId: ValidNetwork;
  contractAddress: string;
}) => {
  return TEMPORARY_ABI_EXPLORER[chainId]?.replace(ABI_ADDRESS, contractAddress);
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

export const fetchABI = async ({
  contractAddress,
  chainId,
  rpcs = TEMPORARY_RPC,
}: {
  contractAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const cachedABI = await getCachedABI({ address: contractAddress, chainId });
  console.log('cachedABI', cachedABI);
  if (cachedABI) {
    // process the ABU and return it
    return cachedABI;
  }

  const url = getABIUrl({ contractAddress, chainId });
  console.log('url', url);
  if (!url) {
    throw new Error('Could generate ABI link with the given arguments');
  }

  try {
    const scanResponse = await fetch(url);
    console.log('scanResponse', scanResponse);
    const data = await scanResponse.json();
    console.log('data', data);
    if (data.message === 'OK' && isJSON(data.result)) {
      const abi = JSON.parse(data.result);
      console.log('abi', abi);
      cacheABI({ address: contractAddress, chainId, abi });
      //process and return abi
      return abi;
    }
    throw new Error('Could not fetch or parse ABI');
  } catch (error) {
    console.error(error);
  }
};
