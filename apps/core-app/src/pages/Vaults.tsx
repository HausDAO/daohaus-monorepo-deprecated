import styled from 'styled-components';

import { BiColumnLayout, Card, widthQuery } from '@daohaus/ui';
import { useDao } from '../contexts/DaoContext';

const LeftCard = styled(Card)`
  width: 100%;
  min-width: 54rem;
  max-width: 64rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Vaults() {
  const { dao } = useDao();

  return (
    <BiColumnLayout
      subtitle="DAO"
      title="Vaults"
      left={
        <LeftCard>{dao && JSON.stringify(dao.tokenBalances, null, 2)}</LeftCard>
      }
      right={null}
    />
  );
}

export default Vaults;
