import { sky, slate, slateDark } from '@radix-ui/colors';
import { ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import {
  DataLg,
  DataMd,
  DataSm,
  DataXs,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  ParLg,
  ParMd,
  ParSm,
  ParXs,
} from './typography';

const Display = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
`;

const FamilyDisplay = styled.div`
  margin-bottom: 2.4rem;
  border-bottom: 1px solid ${slateDark.slate8};
  > * {
    margin-bottom: 2rem;
  }
`;

const DaoHausTypography = () => (
  <Display>
    <FamilyDisplay>
      <H1>header one</H1>
      <H2>header two</H2>
      <H3>header three</H3>
      <H4>header four</H4>
      <H5>header five</H5>
      <H6>header six</H6>
    </FamilyDisplay>
    <FamilyDisplay>
      <ParLg>large paragraph</ParLg>
      <ParMd>medium paragraph</ParMd>
      <ParSm>small paragraph</ParSm>
      <ParXs>extra small paragraph</ParXs>
    </FamilyDisplay>
    <FamilyDisplay>
      <DataLg>large data text</DataLg>
      <DataMd>medium data text</DataMd>
      <DataSm>small data text</DataSm>
      <DataXs>extra small data text</DataXs>
    </FamilyDisplay>
  </Display>
);

export default {
  title: 'atoms/typography',
  component: DaoHausTypography,
} as ComponentMeta<typeof DaoHausTypography>;

export const Typography = () => <DaoHausTypography />;
