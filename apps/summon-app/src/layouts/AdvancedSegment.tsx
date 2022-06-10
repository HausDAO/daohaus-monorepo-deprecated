import { WrappedInput } from '@daohaus/ui';

import { FormSegment, SplitColumn } from '../layouts/FormLayouts';

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
                  id="quorum"
                  label="Quorum %"
<<<<<<< HEAD
                  placeholder="80"
                  required
=======
                  required
                  defaultValue="80"
>>>>>>> efbe086e5fde60d8edc0ff8a2f402636b8ee0352
                  registerOptions={{ required: 'This value is required' }}
                />
              ),
              right: (
                <WrappedInput
                  id="minRetention"
                  label="Min Retention %"
<<<<<<< HEAD
                  placeholder="66"
=======
                  defaultValue="66"
>>>>>>> efbe086e5fde60d8edc0ff8a2f402636b8ee0352
                  required
                  registerOptions={{ required: 'This value is required' }}
                />
              ),
            },
            {
              rowID: 'advanced2',
              left: (
                <WrappedInput
                  id="sponsorThreshold"
                  label="Sponsor Threshold"
<<<<<<< HEAD
                  placeholder="1"
=======
                  defaultValue="0"
>>>>>>> efbe086e5fde60d8edc0ff8a2f402636b8ee0352
                  required
                  registerOptions={{ required: 'This value is required' }}
                />
              ),
              right: (
                <WrappedInput
                  id="newOffering"
                  label="New Offering (ETH)"
<<<<<<< HEAD
                  placeholder="0"
=======
                  defaultValue="0"
>>>>>>> efbe086e5fde60d8edc0ff8a2f402636b8ee0352
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
