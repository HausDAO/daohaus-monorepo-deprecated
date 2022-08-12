import { ethers } from 'ethers';
import { ABI, isJSON, Keychain, ValidNetwork } from '@daohaus/common-utilities';
import { cacheABI, getCachedABI } from './cache';
import {
  GNOSIS_PROXY_ABI,
  SUPERFLUID_PROXY_ABI,
} from '@daohaus/contract-utilities';

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
    // @ts-expect-error: Does exist
    import.meta.env.VITE_INFURA_PROJECT_ID
  }`,
};

const ABI_ADDRESS = '<<address>>';

const TEMPORARY_ABI_EXPLORER: Keychain = {
  '0x5': `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${ABI_ADDRESS}&apikey=${
    // @ts-expect-error: Does exist
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

const getGnosisMasterCopy = async (address: string, chainId: ValidNetwork) => {
  const gnosisProxyContract = createContract({
    address,
    abi: GNOSIS_PROXY_ABI,
    chainId,
  });
  const masterCopy = await gnosisProxyContract?.['masterCopy']?.();
  return masterCopy;
};

export const createContract = ({
  address,
  abi,
  chainId,
  rpcs = TEMPORARY_RPC,
}: {
  address: string;
  abi: ABI;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const rpcUrl = rpcs[chainId];
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
}): Promise<string | false> => {
  const ethersContract = createContract({
    address,
    abi,
    chainId,
    rpcs,
  });

  try {
    const newAddress = await ethersContract?.['implementation']?.();
    return newAddress;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const processABI = async ({
  abi,
  fetchABI,
  contractAddress,
  chainId,
  rpcs = TEMPORARY_RPC,
}: {
  abi: ABI;
  fetchABI: ({
    chainId,
    contractAddress,
    rpcs,
  }: {
    chainId: ValidNetwork;
    contractAddress: string;
    rpcs?: Keychain;
  }) => Promise<ABI | undefined>;
  contractAddress: string;
  chainId: ValidNetwork;
  rpcs: Keychain;
}) => {
  if (isProxyABI(abi)) {
    const proxyAddress = await getImplementation({
      address: contractAddress,
      chainId,
      abi,
    });
    if (proxyAddress) {
      const newData = await fetchABI({
        contractAddress: proxyAddress,
        chainId,
        rpcs,
      });
      if (newData) {
        return newData;
      } else {
        throw new Error('Could not fetch ABI from proxy');
      }
    }
  } else if (isSuperfluidProxy(abi)) {
    const proxyEthersContract = createContract({
      address: contractAddress,
      abi: SUPERFLUID_PROXY_ABI,
      chainId,
    });
    const sfProxyAddr = await proxyEthersContract?.['getCodeAddress']?.();
    const newData = await fetchABI({
      contractAddress: sfProxyAddr,
      chainId,
      rpcs,
    });
    if (newData) {
      return newData;
    } else {
      throw new Error('Could not fetch ABI from proxy');
    }
  } else if (isGnosisProxy(abi)) {
    const gnosisProxyAddress = await getGnosisMasterCopy(
      contractAddress,
      chainId
    );
    const newData = await fetchABI({
      contractAddress: gnosisProxyAddress,
      chainId,
      rpcs,
    });
    return newData;
  }
  return abi;
};

export const fetchABI = async ({
  contractAddress,
  chainId,
  rpcs = TEMPORARY_RPC,
}: {
  contractAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}): Promise<ABI | undefined> => {
  const cachedABI = await getCachedABI({ address: contractAddress, chainId });

  if (cachedABI) {
    return cachedABI;
  }

  const url = getABIUrl({ contractAddress, chainId });
  if (!url) {
    throw new Error('Could generate ABI link with the given arguments');
  }

  try {
    const scanResponse = await fetch(url);
    const data = await scanResponse.json();
    if (data.message === 'OK' && isJSON(data.result)) {
      const abi = JSON.parse(data.result);
      cacheABI({ address: contractAddress, chainId, abi });
      return abi;
    }
    throw new Error('Could not fetch or parse ABI');
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
