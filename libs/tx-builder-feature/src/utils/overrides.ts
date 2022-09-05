import { ArbitraryState, TXOverrides } from '@daohaus/common-utilities';

export const processOverrides = ({
  overrideArgs,
  appState,
}: {
  overrideArgs?: TXOverrides;
  appState: ArbitraryState;
}): TXOverrides => {
  if (!overrideArgs) return {};

  const overrides = {
    value: overrideArgs.value || '0',
  };

  return overrideArgs.gasLimit
    ? { ...overrides, gasLimit: overrideArgs.gasLimit }
    : overrides;
};

// args: [
//   { type: 'singleton', keychain: CONTRACTS.TRIBUTE_MINION },
//   { type: 'static', value: MaxUint256 },
// ],
