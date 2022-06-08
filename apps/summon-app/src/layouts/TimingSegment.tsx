import { WrappedInput } from '@daohaus/ui';
import { TimePicker } from '../components/TimePicker/TimePicker';
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
              <TimePicker
                label="Voting Period"
                id="votingPeriod"
                full
                placeholder="0"
                required
              />
            ),
            right: (
              <TimePicker
                label="Grace Period"
                id="gracePeriod"
                full
                placeholder="0"
                required
              />
            ),
          }}
        />
      }
    />
  );
};
