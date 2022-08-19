import { LOCAL_ABI } from '@daohaus/abi-utilities';
import {
  CONTRACTS,
  isEthAddress,
  isValidNetwork,
  ReactSetter,
} from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { createContract } from '@daohaus/tx-builder-feature';
import {
  border,
  Buildable,
  Button,
  ErrorMessage,
  InputSelectProps,
  ParMd,
  ParXs,
  SuccessMessage,
  Theme,
  WrappedInput,
} from '@daohaus/ui';
import { orange, orangeDark } from '@radix-ui/colors';

import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import styled from 'styled-components';

type TributeInputProps = Omit<InputSelectProps, 'options'>;

const FieldSpacer = styled.div`
  margin-bottom: 3.6rem;
`;

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
  props: Buildable<TributeInputProps> & { addressId?: string; amtId?: string }
) => {
  const { id, addressId = 'tokenAddress', amtId = 'tokenAmount' } = props;

  const { control } = useFormContext();
  const { address, chainId } = useHausConnect();
  const [tokenAddress, tokenAmt] = useWatch({
    name: [addressId, amtId],
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
        />
        {needsApproval && <TemporaryWarning tokenName={tokenData?.tokenName} />}
      </FieldSpacer>
      <FieldSpacer>
        <WrappedInput full label="Token Amount" id={amtId} />
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

const TemporaryWarning = ({ tokenName }: { tokenName: string | undefined }) => {
  return (
    <TempWarningBox>
      <ParXs>You must approve {tokenName || 'Token'} to submit</ParXs>
      <WarningButton sm type="button">
        Approve
      </WarningButton>
    </TempWarningBox>
  );
};
