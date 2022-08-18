import {
  CSInput,
  WrappedCheckbox,
  WrappedInput,
  WrappedInputSelect,
  WrappedRadio,
  WrappedSelect,
  WrappedSwitch,
  WrappedTextArea,
} from '@daohaus/ui';
import { SegmentRender } from './SegmentRender';
import { SplitColumnLayout } from './SplitRender';
import { CheckGate } from './CheckGate';

export const FieldsBase = {
  input: WrappedInput,
  inputSelect: WrappedInputSelect,
  textarea: WrappedTextArea,
  switch: WrappedSwitch,
  radio: WrappedRadio,
  select: WrappedSelect,
  checkBox: WrappedCheckbox,
  csInput: CSInput,
  tributeInput: WrappedInput,
};

export const CoreFieldLookup = {
  ...FieldsBase,
  checkGate: CheckGate,
  formSegment: SegmentRender,
  splitColumn: SplitColumnLayout,
};
