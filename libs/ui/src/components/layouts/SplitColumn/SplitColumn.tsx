import { StyledRow, StyledSplitColumn } from './SplitColumn.styles';

// REVIEW: No stories until there's a solid form sub-layout

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

type Row = {
  rowID: string;
  left: React.ReactNode;
  right: React.ReactNode;
};
const Row = ({ left, right }: Row) => {
  return (
    <StyledRow>
      <div className="left-section">{left}</div>
      <div className="right-section">{right}</div>
    </StyledRow>
  );
};
