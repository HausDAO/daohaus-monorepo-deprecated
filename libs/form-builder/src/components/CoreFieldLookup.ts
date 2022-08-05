import {
  WrappedCheckbox,
  WrappedInput,
  WrappedInputSelect,
  WrappedRadio,
  WrappedSelect,
  WrappedSwitch,
  WrappedTextArea,
} from '@daohaus/ui';
import { SplitColumnLayout } from './SplitRender';

export const CoreFieldLookup = {
  input: WrappedInput,
  inputSelect: WrappedInputSelect,
  textarea: WrappedTextArea,
  switch: WrappedSwitch,
  radio: WrappedRadio,
  select: WrappedSelect,
  checkBox: WrappedCheckbox,
  splitColumn: SplitColumnLayout,
};
