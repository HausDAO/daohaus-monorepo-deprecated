import { TimePicker } from '../components/TimePicker/TimePicker';
import { FormSegment, SplitColumn } from '../layouts/FormLayouts';
import { INFO_COPY } from '../utils/content';
import { FORM_KEYS } from '../utils/formKeys';

export const TimingSegment = ({ formDisabled }: { formDisabled: boolean }) => {
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
                id={FORM_KEYS.VOTING_PERIOD}
                full
                info={INFO_COPY.VOTING_PERIOD}
                disabled={formDisabled}
                placeholder="0"
                required
              />
            ),
            right: (
              <TimePicker
                label="Grace Period"
                id={FORM_KEYS.GRACE_PERIOD}
                info={INFO_COPY.GRACE_PERIOD}
                full
                disabled={formDisabled}
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
