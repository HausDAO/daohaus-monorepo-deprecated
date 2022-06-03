import { ParSm, TemporaryLink, WrappedTextArea } from '@daohaus/ui';
import { FormSegment, TextAreaSection } from '../layouts/FormLayouts';

export const ShamanSegment = () => {
  return (
    <FormSegment
      title="Starting Shamans"
      description="Shamans are very powerful as they can have administrative control over voting and non-voting stakes. Be very careful adding shamans. "
      formArea={
        <TextAreaSection>
          <TemporaryLink className="link">How to add a Shaman</TemporaryLink>
          <ParSm className="number-display">0 Shamans</ParSm>
          <WrappedTextArea
            label="Addresses & Permissions"
            placeholder="0x00000000000000000000000000 3"
            id="shamans"
            full
            number
            helperText="Seems like a valid response"
          />
        </TextAreaSection>
      }
    />
  );
};
