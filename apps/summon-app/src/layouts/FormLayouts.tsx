import { Divider, H5, ParMd } from '@daohaus/ui';
import styled from 'styled-components';

type SegmentType = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  formArea: React.ReactNode;
};

const StyledFormSegment = styled.section`
  width: 100%;
  margin-bottom: 2.4rem;
  .segment-title {
    margin-bottom: 3.2rem;
  }
  .segment-description {
    margin-bottom: 3rem;
  }
`;

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

const StyledSplitColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`;
type Row = {
  rowID: string;
  left: React.ReactNode;
  right: React.ReactNode;
};
type SplitColumnProps = {
  singleRow?: Row;
  rows?: Row[];
};

export const SplitColumn = ({ rows, singleRow }: SplitColumnProps) => {
  return (
    <StyledSplitColumn>
      {singleRow && <Row {...singleRow} />}
      {rows?.map((row) => {
        return <Row key={row.rowID} {...row} />;
      })}
    </StyledSplitColumn>
  );
};

const StyledRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 3.6rem;
  .left-section,
  .right-section {
    width: 24rem;
  }
`;

const Row = ({ left, right }: Row) => {
  return (
    <StyledRow>
      <div className="left-section">{left}</div>
      <div className="right-section">{right}</div>
    </StyledRow>
  );
};

export const TextAreaSection = styled.div`
  width: 100%;
  margin-bottom: 3.4rem;
  .link {
    margin-bottom: 2rem;
  }
  .number-display {
    margin-bottom: 2rem;
  }
`;
export const CenterLayout = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  .main-column {
    width: 58rem;
  }
  .title-section {
    margin-bottom: 16rem;
  }
  .top-divider {
    margin-top: 3rem;
    margin-bottom: 2.4rem;
  }
`;

export const BlockImageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 26rem;
  width: 100%;
  margin-bottom: 2.4rem;
  .img-block {
    display: flex;
    height: 20rem;
    width: 20rem;
  }
  img {
    height: 20rem;
    width: 20rem;
  }
`;

export const InfoSection = styled.div`
  p,
  a {
    margin-bottom: 1.6rem;
  }
`;
