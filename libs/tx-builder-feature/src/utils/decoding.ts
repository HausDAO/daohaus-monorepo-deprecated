import { BigNumber, utils } from 'ethers';
import {
  CONTRACTS,
  ValidNetwork,
  ZERO_ADDRESS,
} from '@daohaus/common-utilities';
import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { createContract, fetchABI } from './abi';

const OPERATION_TYPE = 2;
const ADDRESS = 40;
const VALUE = 64;
const DATA_LENGTH = 64;

type MultisendArgs = {
  chainId: ValidNetwork;
  actionData: string;
};
type EncodedAction = {
  to: string;
  value: string;
  data: string;
  operation: number;
};
export type DecodedAction = {
  to: string;
  name: string;
  value: string;
  params: {
    name: string;
    type: string;
    value: string;
  }[];
};

export type ActionError = {
  error: boolean;
  message: string;
  data: string;
};

export type DecodedMultiTX = (DecodedAction | ActionError)[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isActionError = (action: any): action is ActionError => {
  return action.error;
};

const getMultisendHex = ({ chainId, actionData }: MultisendArgs) => {
  const multisendAddr = CONTRACTS.GNOSIS_MULTISEND[chainId];
  if (!multisendAddr) throw new Error('Invalid chainId');

  const multisendContract = createContract({
    chainId,
    address: multisendAddr,
    abi: LOCAL_ABI.GNOSIS_MULTISEND,
  });

  const decoded = multisendContract.interface['decodeFunctionData'](
    'multiSend',
    actionData
  );

  return decoded['transactions']?.slice(2) || decoded?.[0]?.slice(2);
};

const processAction = (actionsHex: string, txLength: number): EncodedAction => {
  return {
    to: `0x${actionsHex.slice(OPERATION_TYPE, OPERATION_TYPE + ADDRESS)}`,
    value: `0x${actionsHex.slice(
      OPERATION_TYPE + ADDRESS,
      OPERATION_TYPE + ADDRESS + VALUE
    )}`,
    data: `0x${actionsHex.slice(
      OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH,
      OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH + txLength * 2
    )}`,
    operation: parseInt(actionsHex.slice(0, OPERATION_TYPE)),
  };
};
const decodeMultisend = ({ chainId, actionData }: MultisendArgs) => {
  let actionsHex = getMultisendHex({ chainId, actionData });
  const transactions = [];

  while (actionsHex.length >= OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH) {
    const thisTxLength = BigNumber.from(
      `0x${actionsHex.slice(
        OPERATION_TYPE + ADDRESS + VALUE,
        OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH
      )}`
    ).toNumber();

    transactions.push(processAction(actionsHex, thisTxLength));
    actionsHex = actionsHex.slice(
      OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH + thisTxLength * 2
    );
  }

  return transactions;
};

const isEthTransfer = (action: EncodedAction) =>
  action?.data?.slice(2)?.length === 0;
const buildEthTransferAction = (action: EncodedAction): DecodedAction => ({
  to: ZERO_ADDRESS,
  name: 'ETH Transfer',
  value: action.value,
  params: [
    {
      name: 'value',
      type: 'uint256',
      value: BigNumber.from(action.value).toString(),
    },
  ],
});

const decodeAction = async ({
  chainId,
  action,
}: {
  chainId: ValidNetwork;
  action: EncodedAction;
}): Promise<DecodedAction | ActionError> => {
  if (isEthTransfer(action)) return buildEthTransferAction(action);

  const { to, data, value } = action;

  const abi = await fetchABI({ chainId, contractAddress: to });
  if (!abi || !abi?.length) {
    return {
      error: true,
      message: 'No ABI found for this contract',
      data: action.data,
    };
  }

  const decoded = new utils.Interface(abi).parseTransaction({ data, value });

  if (!decoded) {
    return {
      error: true,
      message: 'Could not decode action',
      data: action.data,
    };
  }

  return {
    to,
    name: decoded.name,
    value: decoded.value?.toString(),
    params: decoded.args.map((arg, i) => ({
      name:
        decoded?.functionFragment?.inputs?.[i].name ||
        'ERROR: Could not find name',
      type:
        decoded?.functionFragment?.inputs?.[i].type ||
        'ERROR: Could not find type',
      value: arg,
    })),
  };
};

export const decodeProposalActions = async ({
  chainId,
  actionData,
}: {
  chainId: ValidNetwork;
  actionData: string;
}) => {
  return Promise.all(
    decodeMultisend({ chainId, actionData })?.map(async (action) => {
      return await decodeAction({ chainId, action });
    })
  );
};
