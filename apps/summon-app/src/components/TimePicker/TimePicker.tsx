import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { hoursToSeconds, minutesToSeconds } from 'date-fns/esm';

import { Field, OptionType, WrappedInputSelect } from '@daohaus/ui';
import { isNumberString } from '@daohaus/common-utilities';

//  REFACTOR TO MOLECULES AFTER REVIEW

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
<<<<<<< HEAD
        validate: (value) =>
          value === '' || isNumberString(value) ? true : 'Must be a number',
=======
        validate: {
          isNumber: (value) =>
            value === '' || isNumberString(value) ? true : 'Must be a number',
          noZero: (value) =>
            value !== '0' ? true : 'Time units cannot be zero',
        },
>>>>>>> efbe086e5fde60d8edc0ff8a2f402636b8ee0352
      }}
      {...props}
    />
  );
};
