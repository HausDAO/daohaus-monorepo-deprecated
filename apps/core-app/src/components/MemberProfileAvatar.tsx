import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AccountProfile, Keychain } from "@daohaus/common-utilities";
import { Haus } from "@daohaus/dao-data";
import { MemberCard } from "@daohaus/ui";

type MemberProfileProps = {
  memberAddress: string;
  daochain: keyof Keychain;
};

const MemberContainer = styled.div`
  button {
    padding-left: 0 !important;
  }
`;

export const MemberProfileAvatar = ({
  memberAddress,
  daochain,
}: MemberProfileProps) => {
  const [submitterProfile, setSubmitterProfile] = useState<AccountProfile>();

  const haus = Haus.create();

  const fetchProfile = useCallback(async (
    address: string,
    setter: typeof setSubmitterProfile,
  ) => {
    const profile = await haus.profile.get({ address });
    setter(profile);
  }, [haus.profile]);

  useEffect(() => {
    if (!submitterProfile) {
      fetchProfile(memberAddress, setSubmitterProfile);
    }
  }, [fetchProfile, memberAddress, submitterProfile, setSubmitterProfile]);

  return (
    <MemberContainer>
      <MemberCard
        explorerNetworkId={daochain}
        profile={submitterProfile || {
          address: memberAddress,
        }}
      />
    </MemberContainer>
  );
};
