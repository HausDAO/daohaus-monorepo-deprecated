import { LOCAL_ABI } from '@daohaus/abi-utilities';
import {
  CONTRACTS,
  handleErrorMessage,
  isEthAddress,
  isValidNetwork,
  ReactSetter,
  toBaseUnits,
  toWholeUnits,
} from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { FieldSpacer } from '@daohaus/haus-form-builder';
import { createContract, useTxBuilder } from '@daohaus/tx-builder-feature';
import {
  border,
  Buildable,
  Button,
  ErrorMessage,
  ParXs,
  SuccessMessage,
  Theme,
  useToast,
  WrappedInput,
} from '@daohaus/ui';
import { orangeDark } from '@radix-ui/colors';

import { useEffect, useState } from 'react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import { TX } from '../../legos/tx';

type TokenData = {
  allowance: string;
  balance: string;
  decimals: number;
  tokenName: string;
  tokenSymbol: string;
};

enum TokenFetchStates {
  Idle = '',
  Loading = 'Loading Token Data...',
  NotEthAddress = 'Not a valid Ethereum address',
  NotValidNetwork = 'Not a valid network',
  NotConnected = 'Connection Error',
  Error = 'Error fetching token data',
  Success = 'Success',
}
const fetchUserERC20 = async ({
  tokenAddress,
  chainId,
  userAddress,
  shouldUpdate,
  setFetchState,
  setTokenData,
  setNeedsApproval,
}: {
  tokenAddress: string;
  chainId: string | null | undefined;
  shouldUpdate: boolean;
  userAddress: string | undefined | null;
  setFetchState: ReactSetter<TokenFetchStates>;
  setNeedsApproval: ReactSetter<boolean>;
  setTokenData: ReactSetter<null | TokenData>;
}) => {
  setFetchState(TokenFetchStates.Loading);

  if (!tokenAddress) {
    return setFetchState(TokenFetchStates.Idle);
  }
  if (!isEthAddress(tokenAddress))
    return setFetchState(TokenFetchStates.NotEthAddress);
  if (
    !isValidNetwork(chainId) ||
    !userAddress ||
    !CONTRACTS.TRIBUTE_MINION[chainId]
  )
    return setFetchState(TokenFetchStates.NotValidNetwork);

  const spenderAddress = CONTRACTS.TRIBUTE_MINION[chainId];
  const contract = createContract({
    address: tokenAddress,
    chainId,
    abi: LOCAL_ABI.ERC20,
  });

  try {
    const balance = await contract.balanceOf(userAddress);
    const decimals = await contract.decimals();
    const tokenName = await contract.name();
    const tokenSymbol = await contract.symbol();
    const allowance = await contract.allowance(userAddress, spenderAddress);
    const tokenData = {
      allowance: allowance.toString(),
      balance: balance.toString(),
      decimals,
      tokenName,
      tokenSymbol,
    } as TokenData;

    if (tokenData && shouldUpdate) {
      setTokenData(tokenData);
      setFetchState(TokenFetchStates.Success);

      allowance.toString() === '0'
        ? setNeedsApproval(true)
        : setNeedsApproval(false);
    }
  } catch (error) {
    console.error(error);
    setFetchState(TokenFetchStates.Error);
  }
};

export const TributeInput = (
  props: Buildable<{ addressId?: string; amtId?: string }>
) => {
  const { addressId = 'tokenAddress', amtId = 'tokenAmount' } = props;

  const { control, setValue } = useFormContext();
  const { address, chainId } = useHausConnect();
  const tokenAddress = useWatch({
    name: addressId,
    control,
  });
  const [fetchState, setFetchState] = useState(TokenFetchStates.Idle);
  const [needsApproval, setNeedsApproval] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<null | TokenData>(null);

  useEffect(() => {
    let shouldUpdate = true;
    fetchUserERC20({
      tokenAddress,
      chainId,
      userAddress: address,
      setFetchState,
      setTokenData,
      setNeedsApproval,
      shouldUpdate,
    });
    return () => {
      shouldUpdate = false;
    };
  }, [tokenAddress, address, chainId]);

  const tokenName =
    tokenData?.tokenName && fetchState === TokenFetchStates.Success
      ? ({
          type: 'success',
          message: `Token: ${tokenData.tokenName}`,
        } as SuccessMessage)
      : undefined;

  const tokenError =
    fetchState === TokenFetchStates.Error
      ? ({
          type: 'error',
          message: TokenFetchStates.Error,
        } as ErrorMessage)
      : undefined;

  const tokenAmtRules: RegisterOptions = {
    ...props.rules,
    required: true,
    setValueAs: (val) => {
      if (val === '') return '';
      return toBaseUnits(val);
    },
  };

  const tokenAddressRules: RegisterOptions = {
    ...props.rules,
    required: true,
  };

  const handleMax = () => {
    if (tokenData) {
      setValue(amtId, toWholeUnits(tokenData.balance, tokenData?.decimals));
    }
  };

  const maxButton = tokenData?.balance && tokenData?.decimals && (
    <Button sm secondary onClick={handleMax} type="button">
      Max: {toWholeUnits(tokenData?.balance, tokenData?.decimals)}
    </Button>
  );

  return (
    <>
      <FieldSpacer>
        <WrappedInput
          full
          label="Token Address"
          id={addressId}
          helperText={fetchState}
          success={tokenName}
          error={tokenError}
          rules={tokenAddressRules}
        />
        {needsApproval && tokenData && (
          <TemporaryWarning
            setNeedsApproval={setNeedsApproval}
            tokenName={tokenData?.tokenName}
            tokenAddress={tokenAddress}
          />
        )}
      </FieldSpacer>
      <FieldSpacer>
        <WrappedInput
          full
          label="Token Amount"
          id={amtId}
          disabled={needsApproval}
          rules={tokenAmtRules}
          rightAddon={maxButton}
        />
      </FieldSpacer>
    </>
  );
};

const TempWarningBox = styled.div`
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }: { theme: Theme }) => theme.warningBg};
  border-radius: ${border.radius};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.warningBorder};
  color: ${({ theme }: { theme: Theme }) => theme.warning};
`;

const WarningButton = styled(Button)`
  background-color: ${orangeDark.orange9};
  border: 1px solid ${orangeDark.orange9};
  :hover {
    background-color: ${orangeDark.orange10};
    border: 1px solid ${orangeDark.orange10};
  }
  :active {
    background-color: ${orangeDark.orange9};
    border: 1px solid ${orangeDark.orange9};
  }
`;

enum TxStates {
  Idle = 'Idle',
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Token Approved!',
}

const TemporaryWarning = ({
  tokenName,
  tokenAddress,
  setNeedsApproval,
}: {
  tokenName?: string;
  tokenAddress?: string;
  setNeedsApproval: ReactSetter<boolean>;
}) => {
  const { fireTransaction } = useTxBuilder();
  const [txState, setTxState] = useState(TxStates.Idle);
  const { errorToast, successToast } = useToast();

  const handleApprove = async () => {
    setTxState(TxStates.Loading);

    await fireTransaction({
      tx: TX.APPROVE_TOKEN,
      callerState: {
        tokenAddress,
      },
      lifeCycleFns: {
        onTxError(error) {
          const errMsg = handleErrorMessage({ error });
          setTxState(TxStates.Error);
          errorToast({ title: TxStates.Error, description: errMsg });
        },
        onTxSuccess() {
          setNeedsApproval(false);
          setTxState(TxStates.Success);
          successToast({
            title: TxStates.Success,
            description: `DAOhaus is approved to spend ${tokenName} on your behalf.`,
          });
        },
      },
    });
  };

  return (
    <TempWarningBox>
      <ParXs>You must approve {tokenName || 'Token'} to submit</ParXs>
      <WarningButton sm type="button" onClick={handleApprove}>
        {txState === TxStates.Loading ? 'Loading...' : 'Approve'}
      </WarningButton>
    </TempWarningBox>
  );
};
