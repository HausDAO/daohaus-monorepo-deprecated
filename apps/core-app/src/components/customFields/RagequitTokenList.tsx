import { useMemo } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import {
  toWholeUnits,
  handleBaseUnits,
  getNetwork,
  formatValueTo,
  fromWei,
  memberTokenBalanceShare,
} from '@daohaus/common-utilities';
import {
  Buildable,
  Field,
  ParSm,
  WrappedCheckbox,
  Checkbox,
  Bold,
  DataSm,
} from '@daohaus/ui';

import { useConnectedMembership, useDao } from '@daohaus/dao-context';
import { CheckboxProps, CheckedState } from '@radix-ui/react-checkbox';
import styled from 'styled-components';
import { TokenBalance } from '@daohaus/dao-data';
import { useParams } from 'react-router-dom';

const TokenListContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  width: 33%;
`;

const DataColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-top: 0.8rem;
`;

type TokenTable = {
  tokenCheckboxes: CheckboxProps[];
  amounts: React.ReactNode[];
  usdValue: React.ReactNode[];
};

export const RagequitTokenList = (props: Buildable<Field>) => {
  const { id } = props;
  const { dao } = useDao();
  const { connectedMembership } = useConnectedMembership();
  const { daochain } = useParams();

  const networkData = useMemo(() => {
    if (!daochain) return null;
    return getNetwork(daochain);
  }, [daochain]);

  // TODO
  //// calc connectedMembers cut of each (share+ loot)
  //// setValue/rule to add/remove from tokens array on changes
  //// wire up select/deselect all
  //// layout

  const tokenTable = useMemo((): TokenTable | null => {
    if (!dao || !networkData || !connectedMembership) return null;
    return dao?.tokenBalances
      .filter((token) => Number(token.balance) > 0)
      .reduce(
        (acc: TokenTable, token: TokenBalance) => {
          acc.tokenCheckboxes = [
            ...acc.tokenCheckboxes,
            {
              id: token.tokenAddress || networkData.symbol,
              title: token.token?.name || networkData.symbol,
              name: token.tokenAddress || '0x0',
              defaultChecked: true,
              disabled: false,
              required: false,
            },
          ];
          const memberBalanceShare = memberTokenBalanceShare(
            token.balance,
            dao.totalShares,
            connectedMembership.shares,
            token.token?.decimals || '18'
          );

          console.log('memberBalanceShare', memberBalanceShare);
          acc.amounts = [
            ...acc.amounts,
            <DataSm>
              {formatValueTo({
                value: fromWei(memberBalanceShare),
                decimals: 2,
                format: 'numberShort',
              })}
            </DataSm>,
          ];

          acc.usdValue = [
            ...acc.usdValue,
            <DataSm>{token.fiatBalance}</DataSm>,
          ];

          return acc;
        },
        { tokenCheckboxes: [], amounts: [], usdValue: [] }
      );
  }, [dao, networkData, connectedMembership]);

  const handleSelectAll = (checked: CheckedState) => {
    console.log('select all', checked);
  };

  if (!tokenTable) return null;

  return (
    <>
      <TokenListContainer>
        <Column>
          <Checkbox
            title="Token"
            defaultChecked={true}
            onCheckedChange={handleSelectAll}
          />
        </Column>

        <Column>
          <ParSm>Amount</ParSm>
        </Column>
        <Column>
          <ParSm>USD Value</ParSm>
        </Column>
      </TokenListContainer>
      <TokenListContainer>
        <Column>
          <WrappedCheckbox
            {...props}
            id={id}
            //   rules={newRules}
            checkboxes={tokenTable.tokenCheckboxes}
          />
        </Column>
        <DataColumn>{tokenTable.amounts}</DataColumn>
        <DataColumn>{tokenTable.usdValue}</DataColumn>
      </TokenListContainer>
    </>
  );
};
