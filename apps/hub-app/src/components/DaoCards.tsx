import { ITransformedMembership } from '@daohaus/dao-data';
import { breakpoints } from '@daohaus/ui';
import styled from 'styled-components';
import { DaoCard } from './DaoCard';

const CardListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 6rem;
  row-gap: 3rem;
  justify-content: center;
  @media (min-width: ${breakpoints.xs}) {
    justify-content: flex-start;
  }
`;
export const DaoCards = ({
  daoData,
}: {
  daoData: ITransformedMembership[];
}) => {
  return (
    <CardListBox>
      {daoData.map((dao, index) => (
        <DaoCard key={dao.dao} {...dao} />
      ))}
    </CardListBox>
  );
};
