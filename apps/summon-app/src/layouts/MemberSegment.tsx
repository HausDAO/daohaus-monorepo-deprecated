import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { ParSm, WrappedTextArea } from '@daohaus/ui';
import { FormSegment, TextAreaSection } from '../layouts/FormLayouts';
import { transformMemberData, validateMemberData } from '../utils/common';

export const MembersSegment = () => {
  const { watch, setError, clearErrors } = useFormContext();
  const { members } = watch();

  const [amtMembers, setAmtMembers] = useState(0);
  const [helperText, setHelperText] = useState('');

  const handleBlur = () => {
    //  REVIEW
    //  thinking there might be a repeatable pattern here.
    //  for every input that we use blur validation for
    //  we should be able to use these steps as a guide to create some
    //  sort of common API to ensure that all blur validation follows
    //  a consistent pattern. It would also be nice to not have to type this
    //  stuff out by hand.

    /*  composeBlur({
      validationFn, 
      onFalsy, 
      onValid, 
      onInvalid
    })*/

    // on falsy
    if (!members) {
      clearErrors(['members']);
      setHelperText('');
      setAmtMembers(0);
      return;
    }
    const validationResponse = validateMemberData(members);
    // onValid
    if (validationResponse === true) {
      setAmtMembers(members.memberAddresses.length);
      setHelperText('Seems like a valid response');
      clearErrors(['members']);
      return;
    }
    // onInvalid
    setHelperText('');
    setError('members', {
      message: validationResponse,
      type: 'manual',
    });
  };

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
            helperText={helperText}
            required
            registerOptions={{
              onBlur: handleBlur,
              setValueAs: transformMemberData,
              validate: validateMemberData,
              required: true,
            }}
          />
        </TextAreaSection>
      }
    />
  );
};
