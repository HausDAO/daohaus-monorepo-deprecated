import { Field, OptionType, WrappedInputSelect } from '@daohaus/ui';
import { isNumberString } from '@daohaus/common-utilities';

import React, { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
// import hoursToSeconds from 'date-fns/hoursToSeconds';

import { hoursToSeconds, minutesToSeconds } from 'date-fns/esm';

const defaultOptions = [
  { name: 'Days', value: 'days' },
  { name: 'Hours', value: 'hours' },
  { name: 'Minutes', value: 'minutes' },
  { name: 'Seconds', value: 'seconds' },
];

const conversionFns = {
  days: (amt: number) => hoursToSeconds(amt * 24),
  hours: (amt: number) => hoursToSeconds(amt),
  minutes: (amt: number) => minutesToSeconds(amt),
  seconds: (amt: number) => amt,
};

const toSeconds = (amt: number, unit: keyof typeof conversionFns) =>
  conversionFns[unit]?.(amt);

type TimePickerProps = Field & {
  defaultValue?: string;
  options?: OptionType[];
  selectId?: string;
  selectPlaceholder?: string;
};
export const TimePicker = ({
  id,
  options = defaultOptions,
  selectId,
  required,
  ...props
}: TimePickerProps) => {
  const { setValue, watch } = useFormContext();
  const unitId = useMemo(() => selectId || `${id}Units`, [selectId, id]);
  const [amt, units] = watch([id, unitId]);

  useEffect(() => {
    if (isNumberString(amt) && units in conversionFns) {
      setValue(`${id}InSeconds`, toSeconds(amt, units));
    }
  }, [amt, units, id, setValue]);

  return (
    <WrappedInputSelect
      id={id}
      selectId={unitId}
      options={options}
      required={required}
      registerOptions={{
        required: required ? 'Time value is required' : false,
        validate: (value) =>
          value === '' || isNumberString(value) ? true : 'Must be a number',
      }}
      {...props}
    />
  );
};
