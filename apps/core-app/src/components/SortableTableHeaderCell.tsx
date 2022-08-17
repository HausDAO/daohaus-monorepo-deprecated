import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import styled from 'styled-components';

const CellContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
`;

type TableHeaderCellProps = {
  label: string;
  sortable?: boolean;
  className?: string;
  orderBy: string;
  handleColumnSort: (orderBy: string, orderDirection: 'asc' | 'desc') => void;
};

export const TableHeaderCell = ({
  label,
  sortable,
  className,
  orderBy,
  handleColumnSort,
}: TableHeaderCellProps) => {
  return (
    <CellContainer>
      <div className={className}>{label}</div>
      {sortable && (
        <div>
          <RiArrowDownSFill onClick={() => handleColumnSort(orderBy, 'desc')} />
          <RiArrowUpSFill onClick={() => handleColumnSort(orderBy, 'asc')} />
        </div>
      )}
    </CellContainer>
  );
};
