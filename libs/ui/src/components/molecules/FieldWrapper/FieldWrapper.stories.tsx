import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '../../../types/theming';
import styled from 'styled-components';
import { FieldWrapper } from './FieldWrapper';
import { field } from '../../../theme';
import { border } from '../../../theme/global/border';
import { ParXs } from '../../atoms/Typography';

export default {
  title: 'Molecules/Form/FieldWrapper',
  component: FieldWrapper,
} as ComponentMeta<typeof FieldWrapper>;
const Template: ComponentStory<typeof FieldWrapper> = (args) => (
  <FieldWrapper {...args} />
);

const DummyField = styled.div`
  background-color: ${({ theme }: { theme: Theme }) => theme.field.bg};
  width: 100%;
  max-width: ${field.size.md};
  border-radius: ${border.radius};
  height: 4.8rem;
`;

export const FieldWrapperComponent = Template.bind({});
FieldWrapperComponent.args = {
  children: <DummyField>Sample dummy component</DummyField>,
  label: 'Label',
  success: {
    type: 'success',
    message: 'This is Success helper text',
  },
  required: true,
  info: 'Cooltip text',
};

export const HelperTextPriority = Template.bind({});
HelperTextPriority.args = {
  children: (
    <DummyField>
      <ParXs>
        Helper text factory prioritizes error, warning, success, then helper
      </ParXs>
    </DummyField>
  ),
  label: 'Read code in docs section',
  helperText: 'This should not appear',
  success: {
    type: 'success',
    message: 'This should not appear',
  },
  warning: {
    type: 'warning',
    message: 'This should not appear',
  },
  error: {
    type: 'error',
    message: 'This should appear',
  },
  required: true,
  info: 'Just do it, ok?',
};
