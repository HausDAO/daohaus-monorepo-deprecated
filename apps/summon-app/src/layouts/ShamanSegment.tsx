import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ParSm, TemporaryLink, WrappedTextArea } from '@daohaus/ui';

import { FormSegment, TextAreaSection } from '../layouts/FormLayouts';
import { transformShamans, validateShamanData } from '../utils/common';

const SHAMANS = 'shamans';

export const ShamanSegment = () => {
  const {
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const { shamans } = watch();

  const [amtShamans, setAmtShamans] = useState(0);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (shamans == null) return;
    setAmtShamans(shamans?.shamanAddresses?.length || 0);
    if (shamans === '') {
      setHelperText('');
      return;
    }
    if (!errors?.[SHAMANS] && touchedFields[SHAMANS]) {
      setHelperText('Seems like a valid response');
    }
  }, [shamans, errors, touchedFields]);

  return (
    <FormSegment
      title="Starting Shamans"
      description="Shamans are very powerful as they can have administrative control over voting and non-voting stakes. Be very careful adding shamans. "
      formArea={
        <TextAreaSection>
          <TemporaryLink className="link">How to add a Shaman</TemporaryLink>
          <ParSm className="number-display">{amtShamans} Shamans</ParSm>
          <WrappedTextArea
            label="Addresses & Permissions"
            placeholder="0x00000000000000000000000000 3"
            id={SHAMANS}
            full
            number
            helperText={helperText}
            registerOptions={{
              setValueAs: transformShamans,
              validate: validateShamanData,
            }}
          />
        </TextAreaSection>
      }
    />
  );
};
