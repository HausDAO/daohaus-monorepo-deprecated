import {
  CSInput,
  HighlightInputText,
  ShamanPermission,
  TimePicker,
  WrappedCheckbox,
  WrappedInput,
  WrappedInputSelect,
  WrappedRadio,
  WrappedSelect,
  WrappedSwitch,
  WrappedTextArea,
} from '@daohaus/ui';
import { CheckRender } from './CheckRender';
import { SegmentRender } from './SegmentRender';
import { SplitColumnLayout } from './SplitRender';

export const CoreFieldLookup = {
  input: WrappedInput,
  inputSelect: WrappedInputSelect,
  highlightInputText: HighlightInputText,
  textarea: WrappedTextArea,
  switch: WrappedSwitch,
  radio: WrappedRadio,
  select: WrappedSelect,
  checkBox: WrappedCheckbox,
  csInput: CSInput,
  tributeInput: WrappedInput,
  checkRender: CheckRender,
  formSegment: SegmentRender,
  splitColumn: SplitColumnLayout,
  shamanPermissions: ShamanPermission,
  timePicker: TimePicker,
};
