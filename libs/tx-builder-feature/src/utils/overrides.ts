import { ArbitraryState, TXOverrides } from '@daohaus/common-utilities';

// Adding to the gas limit to account for cost of processProposal
export const PROCESS_PROPOSAL_GAS_LIMIT_ADDITION = 150000;

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
