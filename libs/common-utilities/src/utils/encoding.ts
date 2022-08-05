import { ethers } from 'ethers';
import { ABI, ArgType } from '../types';
import { encodeMultiSend, MetaTransaction } from '@gnosis.pm/safe-contracts';
import { LOCAL_ABI } from '@daohaus/abi-utilities';

export const encodeValues = (
  typesArray: string[],
  valueArray: (string | number)[]
): string => {
  return ethers.utils.defaultAbiCoder.encode(typesArray, valueArray);
};

export const encodeFunction = (
  abi: ABI,
  fnName: string,
  functionArgs: ReadonlyArray<unknown>
): string | { error: true; message: string } => {
  try {
    if (!abi || !Array.isArray(functionArgs))
      throw new Error(
        'Incorrect params passed to safeEncodeHexFunction in abi.js'
      );
    const abiString = JSON.stringify(abi);
    const ethersInterface = new ethers.utils.Interface(abiString);
    return ethersInterface.encodeFunctionData(fnName, functionArgs);
  } catch (error) {
    console.log('error', error);
    return {
      error: true,
      message:
        'Could not encode transaction data with the values entered into this form',
    };
  }
};

export const getNonce = (length = 24) => {
  let text = '';
  const possible = '0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const encodeMultiAction = (rawMulti: MetaTransaction[]) => {
  return encodeFunction(LOCAL_ABI.GNOSIS_MULTISEND, 'multiSend', [
    encodeMultiSend(rawMulti),
  ]);
};

export const txActionToMetaTx = ({
  abi,
  method,
  address,
  args,
  value = 0,
  operation = 0,
}: {
  abi: ABI;
  address: string;
  method: string;
  args: ReadonlyArray<ArgType>;
  value?: string | number;
  operation?: number;
}): MetaTransaction => {
  const encodedData = encodeFunction(abi, method, args);

  if (typeof encodedData !== 'string') {
    throw new Error(encodedData.message);
  }

  return {
    to: address,
    data: encodedData,
    value,
    operation,
  };
};
