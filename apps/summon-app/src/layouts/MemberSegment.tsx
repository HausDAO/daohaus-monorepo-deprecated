import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { ParSm, WrappedTextArea } from '@daohaus/ui';
import { FormSegment, TextAreaSection } from '../layouts/FormLayouts';
import { transformMemberData, validateMemberData } from '../utils/common';
import { isArray } from '@daohaus/common-utilities';

export const MembersSegment = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { members } = watch();

  const [amtMembers, setAmtMembers] = useState(0);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (!members) return;
    if (isArray(members?.memberAddresses)) {
      setAmtMembers(members.memberAddresses.length);
    }
    if (!errors?.['members']) {
      setHelperText('Seems like a valid response');
    }
  }, [members, errors]);

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
            id="members"
            full
            number
            required
            helperText={helperText}
            registerOptions={{
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
