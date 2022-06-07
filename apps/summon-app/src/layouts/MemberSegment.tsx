import { useState } from 'react';
import { isAddress } from 'ethers/lib/utils';
import { useFormContext } from 'react-hook-form';

import { isArray, isNumberString } from '@daohaus/common-utilities';
import { ParSm, WrappedTextArea } from '@daohaus/ui';
import { FormSegment, TextAreaSection } from '../layouts/FormLayouts';

const ValidationMessages = {
  formattingError:
    'Incorrect formatting. Check formatting rules in tooltip above.',
  lootErr:
    'Loot is required and must be a number. Check formatting rules in tooltip above.',
  shareErr:
    'Shares are required and must be a number. Check formatting rules in tooltip above',
  addressErr:
    'Member addresses are required and must be follow the "0x" pattern. Check formatting rules in tooltip above',
};

const validateMemberData = (memberData: Record<string, string[]>) => {
  const { memberAddresses, memberShares, memberLoot } = memberData;
  if (
    !isArray(memberAddresses) ||
    !isArray(memberShares) ||
    !isArray(memberLoot)
  )
    return ValidationMessages.formattingError;

  if (!memberAddresses.every((address) => isAddress(address)))
    return ValidationMessages.addressErr;
  if (!memberShares.every((address) => isNumberString(address)))
    return ValidationMessages.shareErr;
  if (!memberLoot.every((address) => isNumberString(address)))
    return ValidationMessages.lootErr;
  return true;
};

const handleSetValue = (response: string) => {
  if (!response) return '';
  const memberEntities = response
    .split(/[\n|,]/)
    .map((str) => str.trim())
    .filter(Boolean);

  return memberEntities.reduce(
    (acc, member) => {
      const splitString = member.trim().split(' ');
      const newMemberAddress = splitString[0];
      const newMemberShares = splitString[1];
      const newMemberLoot = splitString[2];
      return {
        memberAddresses: [...acc.memberAddresses, newMemberAddress],
        memberShares: [...acc.memberShares, newMemberShares],
        memberLoot: [...acc.memberLoot, newMemberLoot],
      };
    },
    {
      memberAddresses: [] as string[],
      memberShares: [] as string[],
      memberLoot: [] as string[],
    }
  );
};

export const MembersSegment = () => {
  const { watch, setError, clearErrors } = useFormContext();
  const { members } = watch();

  const [amtMembers, setAmtMembers] = useState(0);
  const [helperText, setHelperText] = useState('');

  const handleBlur = () => {
    if (!members) {
      clearErrors(['members']);
      setHelperText('');
      setAmtMembers(0);
      return;
    }
    const validationResponse = validateMemberData(members);
    if (validationResponse === true) {
      setAmtMembers(members.memberAddresses.length);
      setHelperText('Seems like a valid response');
      clearErrors(['members']);
      return;
    }
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
              setValueAs: handleSetValue,
              validate: validateMemberData,
              required: true,
            }}
          />
        </TextAreaSection>
      }
    />
  );
};
