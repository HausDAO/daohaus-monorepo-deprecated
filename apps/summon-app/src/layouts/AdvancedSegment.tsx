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
                  placeholder="80"
                  required
                  registerOptions={{ required: 'This value is required' }}
                />
              ),
              right: (
                <WrappedInput
                  id="minRetention"
                  label="Min Retention %"
                  placeholder="66"
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
                  placeholder="1"
                  required
                  registerOptions={{ required: 'This value is required' }}
                />
              ),
              right: (
                <WrappedInput
                  id="newOffering"
                  label="New Offering (ETH)"
                  placeholder="0"
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
