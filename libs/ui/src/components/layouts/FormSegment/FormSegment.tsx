import { Divider, H5, ParMd } from '../../atoms';
import { StyledFormSegment } from './FormSegment.styles';

type SegmentType = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  formArea: React.ReactNode;
};

export const FormSegment = ({ title, description, formArea }: SegmentType) => {
  return (
    <StyledFormSegment>
      <H5 className="segment-title">{title}</H5>
      <ParMd className="segment-description">{description}</ParMd>
      <div>{formArea}</div>
      <Divider />
    </StyledFormSegment>
  );
};
