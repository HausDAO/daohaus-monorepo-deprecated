import { ParSm, WrappedTextArea } from '@daohaus/ui';
import { FormSegment, TextAreaSection } from '../layouts/FormLayouts';

export const MembersSegment = () => {
  return (
    <FormSegment
      title="Starting Members"
      description="You must have at least one member to start. Add other starting members as desired. You can always add more members later through a proposal or a shaman."
      formArea={
        <TextAreaSection css={{ width: '100%' }}>
          <ParSm className="number-display">0 Members</ParSm>
          <WrappedTextArea
            label="Addresses & Stake Amounts"
            placeholder="0x00000000000000000000000000 30 10"
            id="members"
            full
            number
            helperText="Seems like a valid response"
          />
        </TextAreaSection>
      }
    />
  );
};
