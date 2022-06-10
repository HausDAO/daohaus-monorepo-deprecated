import { useFormContext } from 'react-hook-form';

import { WrappedInput, WrappedSwitch } from '@daohaus/ui';

import { FormSegment, SplitColumn } from './FormLayouts';
import { FORM_COPY } from '../utils/content';
import { FORM_KEYS } from '../utils/formKeys';

export const StakeTokensSegment = () => {
  const { watch } = useFormContext();
  const formValues = watch();

  const votingTransferableLabel = formValues?.[FORM_KEYS.VOTE_TOKEN_TRANSFER]
    ? 'Transferable'
    : 'Not Transferable';
  const nvTransferableLabel = formValues?.[FORM_KEYS.NV_TOKEN_TRANSFER]
    ? 'Transferable'
    : 'Not Transferable';

  return (
    <FormSegment
      title={FORM_COPY.TOKENS.title}
      description={FORM_COPY.TOKENS.description}
      formArea={
        <SplitColumn
          rows={[
            {
              rowID: 'tokenNaming',
              left: (
                <WrappedInput
                  id={FORM_KEYS.TOKEN_NAME}
                  label="Name"
                  placeholder="Voting Stake"
                  required
                  registerOptions={{
                    required: 'Token name is required',
                    maxLength: {
                      value: 50,
                      message: 'Token name cannot be longer than 50 characters',
                    },
                  }}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.TOKEN_SYMBOL}
                  label="Symbol"
                  placeholder="vSTK"
                  full
                  required
                  registerOptions={{
                    required: 'Token name is required',
                    maxLength: {
                      value: 5,
                      message:
                        'Token symbol cannot be longer than 5 characters',
                    },
                  }}
                />
              ),
            },
            {
              rowID: 'tokenTransfer',
              left: (
                <WrappedSwitch
                  id={FORM_KEYS.VOTE_TOKEN_TRANSFER}
                  label="Voting Stake Transferable?"
                  switches={[
                    {
                      fieldLabel: votingTransferableLabel,
                      checked: false,
                    },
                  ]}
                />
              ),
              right: (
                <WrappedSwitch
                  id={FORM_KEYS.NV_TOKEN_TRANSFER}
                  label="Non-Voting Transferable?"
                  switches={[
                    {
                      fieldLabel: nvTransferableLabel,
                      checked: false,
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      }
    />
  );
};
