import { indigoDark } from '@radix-ui/colors';
import { field } from '../../../theme/component/fieldFamily';
import * as RadixSelect from '@radix-ui/react-select';
import styled from 'styled-components';

const themeStuff = {
  default: {
    bg: indigoDark.indigo3,
    text: indigoDark.indigo11,
    borderColor: 'transparent',
  },
};

export const SelectTrigger = styled(RadixSelect.SelectTrigger)`
  /* all: unset; */
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${themeStuff.default.bg};
  color: ${themeStuff.default.text};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  width: 100%;
  line-height: 150%;
  max-width: ${field.size.md};
  height: 4.8rem;
  padding: 1.2rem 1.8rem;
  border: 1px ${themeStuff.default.borderColor} solid;
  transition: ${field.transition};
  border-radius: ${field.borderRadius};
`;
export const SelectRoot = RadixSelect.Root;
export const SelectValue = RadixSelect.Value;
export const SelectIcon = RadixSelect.Icon;
export const SelectViewport = RadixSelect.Viewport;

export const SelectContent = styled(RadixSelect.SelectContent)`
  all: unset;
  overflow: hidden;
  background-color: ${themeStuff.default.bg};
`;

export const SelectItem = styled(RadixSelect.Item)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${themeStuff.default.bg};
  color: ${themeStuff.default.text};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  width: 100%;
  line-height: 150%;
  max-width: ${field.size.md};
  height: 4.8rem;
  padding: 1.2rem 1.8rem;
  border: 1px ${themeStuff.default.borderColor} solid;
  transition: ${field.transition};
  border-radius: ${field.borderRadius};
`;
export const SelectItemText = RadixSelect.ItemText;
