import { FormSegment, SplitColumn, WrappedInput } from '@daohaus/ui';
import {
  INFO_COPY,
  toBaseUnits,
  ValidateField,
} from '@daohaus/common-utilities';

import { FORM_KEYS } from '../utils/formKeys';

export const AdvancedSegment = ({
  formDisabled,
}: {
  formDisabled: boolean;
}) => {
  return (
    <FormSegment
      title="Advanced Governance"
      description="Modify some advanced governance features."
      formArea={
        <SplitColumn
          rows={[
            {
              rowId: 'advanced1',
              left: (
                <WrappedInput
                  id={FORM_KEYS.QUORUM}
                  label="Quorum %"
                  full
                  info={INFO_COPY.QUORUM}
                  defaultValue="0"
                  disabled={formDisabled}
                  rules={{
                    required: 'This value is required',
                    validate: (val) => ValidateField.number(val),
                  }}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.MIN_RETENTION}
                  label="Min Retention %"
                  defaultValue="66"
                  info={INFO_COPY.MIN_RETENTION}
                  full
                  disabled={formDisabled}
                  rules={{
                    required: 'This value is required',
                    validate: (val) => ValidateField.percent(val),
                  }}
                />
              ),
            },
            {
              rowId: 'advanced2',
              left: (
                <WrappedInput
                  id={FORM_KEYS.SPONSOR_THRESHOLD}
                  label="Sponsor Threshold"
                  defaultValue="0"
                  full
                  info={INFO_COPY.SPONSOR_THRESHOLD}
                  disabled={formDisabled}
                  rules={{
                    required: 'This value is required',
                    validate: (val) => ValidateField.number(val),
                  }}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.OFFERING}
                  label="New Offering (ETH)"
                  defaultValue="0"
                  full
                  info={INFO_COPY.NEW_OFFERING}
                  disabled={formDisabled}
                  rules={{
                    required: 'This value is required',
                    validate: (val) => ValidateField.number(val),
                    setValueAs: (val) => toBaseUnits(val),
                  }}
                />
              ),
            },
          ]}
        />
      }
    />
  );
};
