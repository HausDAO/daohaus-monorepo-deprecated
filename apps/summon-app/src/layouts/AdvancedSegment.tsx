import { WrappedInput } from '@daohaus/ui';

import { FormSegment, SplitColumn } from '../layouts/FormLayouts';
import { FORM_KEYS } from '../utils/formKeys';

export const AdvancedSegment = () => {
  return (
    <FormSegment
      title="Advanced Governance"
      description="Modify some advanced governance features."
      formArea={
        <SplitColumn
          rows={[
            {
              rowID: 'advanced1',
              left: (
                <WrappedInput
                  id={FORM_KEYS.QUORUM}
                  label="Quorum %"
                  required
                  defaultValue="80"
                  registerOptions={{ required: 'This value is required' }}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.MIN_RETENTION}
                  label="Min Retention %"
                  defaultValue="66"
                  required
                  registerOptions={{ required: 'This value is required' }}
                />
              ),
            },
            {
              rowID: 'advanced2',
              left: (
                <WrappedInput
                  id={FORM_KEYS.SPONSOR_THRESHOLD}
                  label="Sponsor Threshold"
                  defaultValue="0"
                  required
                  registerOptions={{ required: 'This value is required' }}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.OFFERING}
                  label="New Offering (ETH)"
                  defaultValue="0"
                  required
                  registerOptions={{ required: 'This value is required' }}
                />
              ),
            },
          ]}
        />
      }
    />
  );
};
