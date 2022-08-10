import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSegment, ParSm, Link, WrappedTextArea } from '@daohaus/ui';
import { INFO_COPY } from '@daohaus/common-utilities';

import { TextAreaSection } from '../layouts/FormLayouts';
import { transformShamans, validateShamanData } from '../utils/common';
import { FORM_KEYS } from '../utils/formKeys';

export const ShamanSegment = ({ formDisabled }: { formDisabled: boolean }) => {
  const {
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const shamans = watch(FORM_KEYS.SHAMANS);

  const [amtShamans, setAmtShamans] = useState(0);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (shamans == null) return;
    setAmtShamans(shamans?.shamanAddresses?.length || 0);
    if (shamans === '') {
      setHelperText('');
      return;
    }
    if (!errors?.[FORM_KEYS.SHAMANS] && touchedFields[FORM_KEYS.SHAMANS]) {
      setHelperText('Seems like a valid response');
    }
  }, [shamans, errors, touchedFields]);

  return (
    <FormSegment
      title="Starting Shamans"
      description="Shamans are very powerful as they can have administrative control over voting and non-voting stakes. Be very careful adding Shamans. "
      formArea={
        <TextAreaSection>
          <Link
            className="link"
            href="https://baal-docs.vercel.app/tools/shaman"
            linkType="external"
          >
            How to add a Shaman
          </Link>
          <ParSm className="number-display">{amtShamans} Shamans</ParSm>
          <WrappedTextArea
            label="Addresses & Permissions"
            placeholder="0x00000000000000000000000000 3"
            id={FORM_KEYS.SHAMANS}
            full
            info={INFO_COPY.SHAMAN}
            number
            disabled={formDisabled}
            helperText={helperText}
            rules={{
              setValueAs: transformShamans,
              validate: validateShamanData,
            }}
          />
        </TextAreaSection>
      }
    />
  );
};
