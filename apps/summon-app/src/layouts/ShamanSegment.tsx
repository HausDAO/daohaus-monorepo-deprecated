import { ParSm, TemporaryLink, WrappedTextArea } from '@daohaus/ui';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormSegment, TextAreaSection } from '../layouts/FormLayouts';
import { transformShamans, validateShamanData } from '../utils/common';

const FIELD_ID = 'shamans';

export const ShamanSegment = () => {
  const { watch, clearErrors, setError } = useFormContext();
  const { shamans } = watch();

  const [amtShamans, setAmtShamans] = useState(0);
  const [helperText, setHelperText] = useState('');

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
            id={FIELD_ID}
            full
            number
            helperText={helperText}
            registerOptions={{
              setValueAs: transformShamans,
              validate: () => false,
            }}
          />
        </TextAreaSection>
      }
    />
  );
};
