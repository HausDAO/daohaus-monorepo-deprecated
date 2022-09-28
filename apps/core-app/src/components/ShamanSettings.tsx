import styled from 'styled-components';
import { H3, ParSm } from '@daohaus/ui';

import { TDao } from '@daohaus/dao-context';
import { ShamanList } from './ShamanList';

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
          Shamans are contracts that can adjust governance, shares, and
          memberships without proposals. Because shamans can affect the security
          of the DAO, be cautious when adding new shamans, and remove any that
          are no longer needed.
        </ParSm>
      </div>

      {dao.shamen && dao.shamen.length > 0 && (
        <ShamanList shamen={dao.shamen} />
      )}
    </ShamanContainer>
  );
};
