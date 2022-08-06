import {
  ArgType,
  calcExpiry,
  StringSearch,
  TXLego,
  ValidArgType,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { handleGasEstimate, handleMulticallArg } from './multicall';

const isSearchArg = (arg: ValidArgType): arg is StringSearch => {
  return typeof arg === 'string' && arg[0] === '.';
};

// To be built next issue
const handleStringSearch = (arg: StringSearch) => arg;

export const processArg = async ({
  arg,
  chainId,
  safeId,
}: {
  arg: ValidArgType;
  chainId: ValidNetwork;
  safeId?: string;
}): Promise<ArgType> => {
  if (isSearchArg(arg)) {
    return handleStringSearch(arg);
  }
  if (arg?.type === 'static') {
    return arg.value;
  }
  if (arg?.type === 'multicall') {
    const result = await handleMulticallArg({ arg, chainId });
    return result;
  }
  if (arg?.type === 'estimateGas') {
    console.log('safeId', safeId);
    const result = await handleGasEstimate({ arg, chainId, safeId });
    return result;
  }
  if (arg?.type === 'proposalExpiry') {
    //TODO: implement search for proposal expiry
    return calcExpiry(arg.fallback);
  }

  // This is a placeholder for when we implemnt the gatherArgs utils
  // https://github.com/HausDAO/daohaus-monorepo/issues/403
  throw new Error('ArgType not found. Searching not yet implemented');
};

export const processArgs = async ({
  tx,
  chainId,
  safeId,
}: {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
}) => {
  console.log('safeId', safeId);
  const { argCallback, args } = tx;

  if (argCallback) {
    return [];
  }
  if (args) {
    return await Promise.all(
      args?.map(async (arg) => await processArg({ arg, chainId, safeId }))
    );
  }
  throw new Error(
    'TX Lego must have a valid arg type, use either a string alias for an argument callback or an array of valid arguments'
  );
};
