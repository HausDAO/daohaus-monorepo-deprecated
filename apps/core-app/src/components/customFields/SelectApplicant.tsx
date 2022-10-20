import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMembers } from '../../contexts/DaoContext';
import { Keychain } from '@daohaus/common-utilities';
import { Buildable, Button, ErrorMessage, Field, OptionType, WrappedInput, WrappedSelect } from '@daohaus/ui';

import { isActiveMember } from '../../utils/dataFetchHelpers';

type SelectApplicantProps = Buildable<Field & {
  daoMemberOnly?: boolean;
}>;

export const SelectApplicant = ({ daoMemberOnly, ...props }: SelectApplicantProps) => {
  const [textMode, toggleTextMode] = useState(false);
  const [memberList, setMemberList] = useState<Array<OptionType>>([]);
  const [memberLoading, setMemberLoading] = useState(false);
  const [valError, setValError] = useState<ErrorMessage | undefined>();
  const { daochain, daoid } = useParams();
  const { register, setValue, watch } = useFormContext();
  const { members } = useMembers();
  const inputValue = watch(props.id);

  register('memberShares');
  register('memberLoot');

  const Component = textMode ? WrappedInput : WrappedSelect;

  const cleanup = useCallback(() => {
    setValue('memberShares', '');
    setValue('memberLoot', '');
    setValError(undefined);
  }, [setValue]);

  const fetchMember = useCallback(async (memberAddress: string, validateMember: boolean) => {
    if (daochain && daoid) {
      const rs = await isActiveMember({
        daochain: daochain as keyof Keychain,
        daoid,
        address: memberAddress,
        setMemberLoading,
      });
      if (rs.member) {
        setValue('memberShares', rs.member.shares);
        setValue('memberLoot', rs.member.loot);
      }
      if (validateMember && rs.error) setValError(rs.error);
    }
  }, [daochain, daoid, setValue]);

  const ToggeButton = () => {
    return (
      <Button sm tertiary onClick={() => {
        setValue(props.id, '');
        toggleTextMode(!textMode);
      }}>
        {textMode ? 'Select Member' : 'Input Address'}
      </Button>
    )
  };

  useEffect(() => {
    if (members) {
      // TODO: WHat about pagination?
      setMemberList(members.map(m => ({
        name: m.memberAddress,
        value: m.memberAddress,
      })))
    }
  }, [members]);

  useEffect(() => {
    cleanup();
    if (inputValue) {
      fetchMember(inputValue.toLowerCase(), !!daoMemberOnly && textMode);
    }
  }, [cleanup, daoMemberOnly, fetchMember, inputValue, textMode]);

  return (
    <Component
      {...props}
      error={valError}
      loading={memberLoading}
      options={!textMode ? memberList : []}
      placeholder={!textMode ? `Choose a Member` : `0x`}
      rightAddon={<ToggeButton />}
    />
  );
};



