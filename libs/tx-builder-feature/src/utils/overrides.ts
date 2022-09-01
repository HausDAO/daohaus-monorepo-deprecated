import { ArbitraryState } from '@daohaus/common-utilities';
import { TXOverrides } from '@daohaus/ethers-utilities';

export const processOverrides = ({
  overrideArgs,
  appState,
}: {
  overrideArgs?: TXOverrides;
  appState: ArbitraryState;
}): TXOverrides => {
  return {
    value: appState['formValues']?.proposalOffering
      ? Number(appState['formValues']?.proposalOffering).toFixed()
      : '0',
    ...overrideArgs,
  };
};
