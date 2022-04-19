import { slateDark } from '@radix-ui/colors';
import styled, { useTheme } from 'styled-components';
import {
  Bold,
  DataLg,
  DataMd,
  DataSm,
  DataXl,
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
  ParXl,
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

export default {
  title: 'atoms/typography',
};

export const AllFonts = () => {
  const theme = useTheme();
  console.log('theme', theme);
  return (
    <Display>
      <FamilyDisplay>
        <H1>
          header <Bold>one</Bold>
        </H1>
        <H2>header two</H2>
        <H3>header three</H3>
        <H4>header four</H4>
        <H5>header five</H5>
        <H6>header six</H6>
      </FamilyDisplay>
      <FamilyDisplay>
        <ParXl>extra large paragraph</ParXl>
        <ParLg>large paragraph</ParLg>
        <ParMd>medium paragraph</ParMd>
        <ParSm>small paragraph</ParSm>
        <ParXs>extra small paragraph</ParXs>
      </FamilyDisplay>
      <FamilyDisplay>
        <DataXl>Extra large data text</DataXl>
        <DataLg>large data text</DataLg>
        <DataMd>medium data text</DataMd>
        <DataSm>small data text</DataSm>
        <DataXs>extra small data text</DataXs>
      </FamilyDisplay>
    </Display>
  );
};
