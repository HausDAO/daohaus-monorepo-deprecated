import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSegment, ParSm, WrappedTextArea } from '@daohaus/ui';

import { TextAreaSection } from '../layouts/FormLayouts';
import { transformMemberData, validateMemberData } from '../utils/common';
import { FORM_KEYS } from '../utils/formKeys';
import { INFO_COPY } from '../utils/content';

export const MembersSegment = ({ formDisabled }: { formDisabled: boolean }) => {
  const {
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const members = watch(FORM_KEYS.MEMBERS);

  const [amtMembers, setAmtMembers] = useState(0);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (members == null) return;
    setAmtMembers(members?.memberAddresses?.length || 0);
    if (members === '') {
      setHelperText('');
      return;
    }
    if (!errors?.[FORM_KEYS.MEMBERS] && touchedFields[FORM_KEYS.MEMBERS]) {
      setHelperText('Seems like a valid response');
    }
  }, [members, errors, touchedFields]);

  return (
    <FormSegment
      title="Starting Members"
      description="You must have at least one member to start. Add other starting members as desired. You can always add more members later through a proposal or a shaman."
      formArea={
        <TextAreaSection css={{ width: '100%' }}>
          <ParSm className="number-display">{amtMembers} Members</ParSm>
          <WrappedTextArea
            label="Addresses & Stake Amounts"
            placeholder="0x00000000000000000000000000 30 10"
            id={FORM_KEYS.MEMBERS}
            info={INFO_COPY.MEMBERS}
            full
            number
            disabled={formDisabled}
            helperText={helperText}
            rules={{
              setValueAs: transformMemberData,
              validate: validateMemberData,
              required: 'Members is a required field',
            }}
          />
        </TextAreaSection>
      }
    />
  );
};
