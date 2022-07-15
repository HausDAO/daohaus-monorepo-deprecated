import { ComponentMeta, ComponentStory } from '@storybook/react';
import styled from 'styled-components';
import { Card } from '../../atoms';
import { Main } from '../../layouts/Main';
import { FormLayout } from './FormLayout';

export default {
  title: 'Layouts/FormLayout',
  component: FormLayout,
} as ComponentMeta<typeof FormLayout>;

const Template: ComponentStory<typeof FormLayout> = (args) => (
  <Main>
    <FormLayout {...args} />
  </Main>
);

const Spacer = styled.div`
  width: 100%;
  height: 50rem;
`;

export const BaseFormLayout = Template.bind({});

BaseFormLayout.args = {
  title: 'Form Layout',
  subtitle: 'Form Layout subtitle',
  description: 'Form Layout description',
  children: (
    <Card>
      <Spacer />
    </Card>
  ),
};
