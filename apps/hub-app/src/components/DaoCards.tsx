import { widthQuery } from '@daohaus/ui';
import styled from 'styled-components';
import { TemporaryDAOType } from '../utils/appSpecificTypes';
import { DaoCard } from './DaoCard';

type CardsProps = {
  daoData: TemporaryDAOType[];
};

const CardListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 6rem;
  row-gap: 3rem;
  @media ${widthQuery.sm} {
    justify-content: center;
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
