import styled from 'styled-components';
import { TemporaryDAOType } from '../pages/HomePage';
import { DaoCard } from './DaoCard';

type CardsProps = {
  daoData: TemporaryDAOType[];
};

const CardListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 6rem;
  row-gap: 3rem;
  .dao-card {
  }
`;
export const DaoCards = ({ daoData }: CardsProps) => {
  return (
    <CardListBox>
      {daoData.map((dao, index) => (
        <DaoCard key={`${dao.daoName}-${index}`} {...dao} />
      ))}
    </CardListBox>
  );
};
