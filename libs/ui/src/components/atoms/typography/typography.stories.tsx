import { ComponentMeta } from '@storybook/react';
import { H1, H2, H3, H4, H5, H6, ParMd, ParSm, ParXs } from './typography';

const DaoHausTypography = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <H1>Header 1</H1>
    <H2>Header 2</H2>
    <H3>Header 3</H3>
    <H4>Header 4</H4>
    <H5>Header 5</H5>
    <H6>Header 6</H6>
    <ParMd>Medium Paragraph</ParMd>
    <ParSm>Small Paragraph</ParSm>
    <ParXs>Medium Paragraph</ParXs>
  </div>
);

export default {
  title: 'atoms/typography',
  component: DaoHausTypography,
} as ComponentMeta<typeof DaoHausTypography>;

export const Typography = () => <DaoHausTypography />;
export const Header1 = () => <H1>Header 1</H1>;
export const Header2 = () => <H2>Header 2</H2>;
export const Header3 = () => <H3>Header 3</H3>;
