import {
  ABI,
  ArbitraryState,
  ArgType,
  calcExpiry,
  StringSearch,
  TXLego,
  ValidArgType,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { EXPIRY, FORM } from './constants';
import { handleGasEstimate, handleMulticallArg } from './multicall';
import { handleDetailsJSON, searchArg } from './search';

const isSearchArg = (arg: ValidArgType): arg is StringSearch => {
  return typeof arg === 'string' && arg[0] === '.';
};

export const processArg = async ({
  arg,
  chainId,
  safeId,
  localABIs,
  appState,
}: {
  arg: ValidArgType;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
}): Promise<ArgType> => {
  if (isSearchArg(arg)) {
    const res = searchArg({ appState, searchString: arg, shouldThrow: true });
    console.log('res', res);
    return res;
  }
  if (arg?.type === 'static') {
    return arg.value;
  }
  if (arg?.type === 'multicall') {
    const result = await handleMulticallArg({
      arg,
      chainId,
      localABIs,
      appState,
    });
    return result;
  }
  if (arg?.type === 'estimateGas') {
    const result = await handleGasEstimate({
      arg,
      chainId,
      safeId,
      localABIs,
      appState,
    });
    return result;
  }
  if (arg?.type === 'proposalExpiry') {
    return arg.search
      ? searchArg({
          appState,
          searchString: `${FORM}${EXPIRY}`,
          shouldThrow: true,
        })
      : calcExpiry(arg.fallback);
  }
  if (arg?.type === 'JSONDetails') {
    const result = await handleDetailsJSON({
      arg,
      chainId,
      safeId,
      localABIs,
      appState,
    });
    return result;
  }
  console.log('**DEBUG**');
  console.log('arg', arg);
  throw new Error(`ArgType not found.`);
};

export const processArgs = async ({
  tx,
  chainId,
  safeId,
  localABIs,
  appState,
}: {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
}) => {
  const { argCallback, args, staticArgs } = tx;

  if (staticArgs) {
    return staticArgs;
  }

  if (argCallback) {
    return [];
  }

  if (args) {
    return await Promise.all(
      args?.map(
        async (arg) =>
          await processArg({ arg, chainId, safeId, localABIs, appState })
      )
    );
  }
  throw new Error(
    'TX Lego must have a valid arg type, use either a string alias for an argument callback or an array of valid arguments'
  );
};
