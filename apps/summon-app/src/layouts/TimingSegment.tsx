import { WrappedInput } from '@daohaus/ui';
import { FormSegment, SplitColumn } from '../layouts/FormLayouts';

export const TimingSegment = () => {
  return (
    <FormSegment
      title="Proposal Timing"
      description="Define your timing for Voting and Grace periods. You can update these settings through a proposal."
      formArea={
        <SplitColumn
          singleRow={{
            rowID: 'timing',
            left: (
              <WrappedInput
                label="Voting Period"
                id="votingPeriod"
                placeholder="Wait for Input Select"
              />
            ),
            right: (
              <WrappedInput
                label="Grace Period"
                id="gracePeriod"
                placeholder="Wait for Input-Select"
              />
            ),
          }}
        />
      }
    />
  );
};
