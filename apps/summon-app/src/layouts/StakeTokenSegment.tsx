import { useFormContext } from 'react-hook-form';

import { WrappedInput, WrappedSwitch } from '@daohaus/ui';

import { FormSegment, SplitColumn } from './FormLayouts';
import { FORM_COPY } from '../utils/content';

export const StakeTokensSegment = () => {
  const { watch } = useFormContext();
  const formValues = watch();
  const votingTransferableLabel = formValues?.votingTransferable
    ? 'Transferable'
    : 'Not Transferable';
  const nvTransferableLabel = formValues?.nvTransferable
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
                  id="tokenName"
                  label="Name"
                  placeholder="Voting Stake"
                />
              ),
              right: (
                <WrappedInput
                  id="tokenSymbol"
                  label="Symbol"
                  placeholder="vSTK"
                  full
                />
              ),
            },
            {
              rowID: 'tokenTransfer',
              left: (
                <WrappedSwitch
                  id="votingTransferable"
                  label="Voting Stake Transferable?"
                  switches={[
                    {
                      fieldLabel: votingTransferableLabel,
                    },
                  ]}
                />
              ),
              right: (
                <WrappedSwitch
                  id="nvTransferable"
                  label="Non-Voting Transferable?"
                  switches={[
                    {
                      fieldLabel: nvTransferableLabel,
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
