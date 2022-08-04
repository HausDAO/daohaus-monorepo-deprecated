import styled from 'styled-components';
import { H3, ParSm } from '@daohaus/ui';

import { TDao } from '../contexts/DaoContext';

const ShamanContainer = styled.div`
  .tokens {
    margin-top: 3rem;
  }
  h4 {
    margin-top: 4rem;
  }
`;

// putting this in place for when we bring in the action button
const ShamanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

type ShamanSettingsProps = {
  dao: TDao;
};

export const ShamanSettings = ({ dao }: ShamanSettingsProps) => {
  return (
    <ShamanContainer>
      <ShamanCardHeader>
        <H3>Shamans</H3>
      </ShamanCardHeader>
      <div className="description">
        <ParSm>
          Contracts that can adjust governance, shares, and memberships without
          proposals. Be careful with adding new and it’s recommended that the
          DAO removes any that aren’t needed any longer.
        </ParSm>
      </div>

      {/* {dao.shamans} */}
    </ShamanContainer>
  );
};
