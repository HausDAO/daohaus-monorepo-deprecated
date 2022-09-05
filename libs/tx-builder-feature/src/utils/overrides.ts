import { ArbitraryState, TXOverrides } from '@daohaus/common-utilities';

// Adding to the gas limit to account for cost of processProposal
const GAS_LIMIT_ADDITION = 150000;

export const processOverrides = ({
  overrideArgs,
  appState,
}: {
  overrideArgs?: TXOverrides;
  appState: ArbitraryState;
}): TXOverrides => {
  const overrides = {
    value: appState['formValues']?.proposalOffering
      ? Number(appState['formValues']?.proposalOffering).toFixed()
      : '0',
    ...overrideArgs,
  };
  if (overrideArgs?.gasLimit) {
    overrides.gasLimit = (
      Number(overrideArgs.gasLimit) + GAS_LIMIT_ADDITION
    ).toFixed();
  }
  return overrides;
};
