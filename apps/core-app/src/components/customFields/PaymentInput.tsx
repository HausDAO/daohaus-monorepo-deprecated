import {
  isValidNetwork,
  NETWORK_DATA,
  ReactSetter,
  toWholeUnits,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { DaoWithTokenData, TokenBalance } from '@daohaus/dao-data';
import { FieldSpacer } from '@daohaus/haus-form-builder';
import {
  Buildable,
  Button,
  WrappedInput,
  WrappedInputSelect,
} from '@daohaus/ui';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDao } from '../../contexts/DaoContext';

const EMPTY_BALANCE = { networkToken: null, erc20s: null };

enum InputStates {
  Loading,
  InvalidNetwork = 'Invalid Network',
  CorruptTokenData = 'Corrupt Token Data',
}

type ERC20Data = {
  decimals: number;
  name: string;
  symbol: string;
  daoBalance: string;
  address: string;
};

const isNetworkToken = (tokenData: TokenBalance) => {
  return !tokenData.token;
};

export const processDaoTokenData = (
  daoData: DaoWithTokenData,
  daochain: ValidNetwork,
  setInputState: ReactSetter<InputStates>
) => {
  const networkData = NETWORK_DATA[daochain];
  if (!networkData) {
    setInputState(InputStates.InvalidNetwork);
    return EMPTY_BALANCE;
  }

  let networkToken = undefined;
  let erc20s: ERC20Data[] = [];

  for (const tokenData of daoData.tokenBalances) {
    if (isNetworkToken(tokenData)) {
      const decimals = networkData.tokenDecimals;
      const symbol = networkData.symbol;
      const name =
        daochain === '0x1' ? 'ETH' : `${symbol} on ${networkData.name}`;
      networkToken = {
        daoBalance: tokenData.balance,
        decimals,
        symbol,
        name,
      };
    } else {
      erc20s = [
        ...erc20s,
        {
          daoBalance: tokenData.balance,
          decimals: tokenData.token?.decimals || 18,
          address: tokenData.tokenAddress || 'Unknown',
          name: tokenData.token?.name || 'Unknown',
          symbol: tokenData.token?.symbol || 'Unknown',
        },
      ];
    }
  }
  if (!networkToken) {
    setInputState(InputStates.CorruptTokenData);
    return EMPTY_BALANCE;
  }

  return { networkToken, erc20s };
};

const getTokenBalance = (
  erc20s: ERC20Data[] | null,
  paymentTokenAddr: string
) => {
  if (!Array.isArray(erc20s) || !paymentTokenAddr) {
    return '';
  }
  const token = erc20s.find(({ address }) => address === paymentTokenAddr);

  return toWholeUnits(token?.daoBalance || '0', token?.decimals);
};

export const PaymentInput = (
  props: Buildable<{ amtId?: string; addressId?: string }>
) => {
  const { daochain } = useParams();
  const { amtId = 'paymentTokenAmt', addressId = 'paymentTokenAddress' } =
    props;
  const { dao } = useDao();
  const { watch } = useFormContext();

  const paymentTokenAddr = watch(addressId);
  const [inputState, setInputState] = useState(InputStates.Loading);

  const { networkToken, erc20s } = useMemo(() => {
    if (dao && isValidNetwork(daochain)) {
      return processDaoTokenData(dao, daochain, setInputState);
    }
    return EMPTY_BALANCE;
  }, [dao, daochain]);

  const selectOptions = useMemo(() => {
    if (erc20s) {
      const options = erc20s.map((token) => ({
        name: token.symbol,
        value: token.address,
      }));

      return options;
    }
  }, [erc20s]);

  const tokenBalance = getTokenBalance(erc20s, paymentTokenAddr);

  return (
    <>
      <FieldSpacer>
        <WrappedInputSelect
          {...props}
          id={amtId}
          label="Request ERC-20"
          defaultValue="0"
          selectId={addressId}
          selectPlaceholder="--"
          options={selectOptions || []}
          rightAddon={
            <Button secondary sm>
              Max: {tokenBalance}
            </Button>
          }
        />
      </FieldSpacer>
      <FieldSpacer>
        <WrappedInput
          {...props}
          id={'valueRequested'}
          label={`Request ${networkToken?.name}`}
          defaultValue="0"
        />
      </FieldSpacer>
    </>
  );
};
