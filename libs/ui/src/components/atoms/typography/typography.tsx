import { font } from '../../../theme/global/font';
import styled from 'styled-components';

////////////////////PARAGRAPH TEXT////////////////////
export const ParXs = styled.p`
  font-size: ${font.size.xs};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.body};
`;
// ParSm Not actually implemented in design
export const ParSm = styled.p`
  font-size: ${font.size.sm};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.body};
`;
export const ParMd = styled.p`
  font-size: ${font.size.md};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.body};
`;
export const ParLg = styled.p`
  font-size: ${font.size.lg};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.body};
`;
////////////////////HEADER TEXT////////////////////
export const H6 = styled.h6`
  font-size: ${font.size.md};
  font-weight: ${font.weight.black};
  font-family: ${font.family.body};
`;
export const H5 = styled.h5`
  font-size: ${font.size.lg};
  font-weight: ${font.weight.bold};
  font-family: ${font.family.body};
`;
export const H4 = styled.h4`
  font-size: ${font.size.xl};
  font-weight: ${font.weight.bold};
  font-family: ${font.family.body};
`;
export const H3 = styled.h3`
  font-size: ${font.size.xxl};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.body};
`;
export const H2 = styled.h2`
  font-size: ${font.size.xxxl};
  font-weight: ${font.weight.light};
  font-family: ${font.family.body};
`;
export const H1 = styled.h1`
  font-size: ${font.size.xxxxl};
  font-weight: ${font.weight.light};
  font-family: ${font.family.body};
`;
////////////////////DATA TEXT////////////////////
export const DataXs = styled.p`
  font-size: ${font.size.xs};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.data};
`;
export const DataSm = styled.p`
  font-size: ${font.size.sm};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.data};
`;
export const DataMd = styled.p`
  font-size: ${font.size.md};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.data};
`;
export const DataLg = styled.p`
  font-size: ${font.size.lg};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.data};
`;
export const DataXl = styled.p`
  font-size: ${font.size.xl};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.data};
`;
///////////////////////FONT-MODS/////////////////////
export const Light = styled.span`
  font-weight: ${font.weight.light};
`;
export const Bold = styled.span`
  font-weight: ${font.weight.bold};
`;
export const ExtraBold = styled.span`
  font-weight: ${font.weight.black};
`;
export const Italic = styled.span`
  font-style: italic;
`;
export const Underline = styled.span`
  text-decoration: underline;
`;
export const Strikethrough = styled.span`
  text-decoration: line-through;
`;
