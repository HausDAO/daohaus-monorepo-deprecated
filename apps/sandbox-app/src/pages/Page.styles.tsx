import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PlainLink = styled(Link)`
  color: unset;
  text-decoration: unset;
`;

export const ListCard = styled.div`
  margin: 1rem 0 3rem 0;
`;

export const DaoDataContainer = styled.div`
  margin: 2rem 4rem 1rem 0;
  width: 100%;
`;

export const DaoField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin: 1rem 0 1rem 0;
`;
