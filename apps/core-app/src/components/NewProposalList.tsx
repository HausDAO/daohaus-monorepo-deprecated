import { useParams } from 'react-router-dom';
import { RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Bold, DataSm, Link, ParMd, Theme } from '@daohaus/ui';

import { CustomFormLego } from '../legos/config';

const ListContainer = styled.div`
  margin-top: 5rem;
`;

const ListItemContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  border-top: 1px ${({ theme }: { theme: Theme }) => theme.card.hoverBorder}
    solid;
  padding: 3rem 0;
  color: unset;
  :hover {
    text-decoration: none;
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  word-wrap: break-word;
`;

const StyledIcon = styled(RiArrowRightSLine)`
  fill: ${({ theme }: { theme: Theme }) => theme.primary};
  font-size: 3rem;
`;

type NewProposalListProps = {
  proposalLegos: CustomFormLego[];
};

export const NewProposalList = ({ proposalLegos }: NewProposalListProps) => {
  const { daochain, daoid } = useParams();
  return (
    <ListContainer>
      {proposalLegos.map((proposalLego: CustomFormLego) => (
        <ListItemContainer
          href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=${proposalLego.id}`}
        >
          <ListItem>
            <ParMd>
              <Bold>{proposalLego.title}</Bold>
            </ParMd>
            <DataSm>{proposalLego.description}</DataSm>
          </ListItem>
          <StyledIcon />
        </ListItemContainer>
      ))}
    </ListContainer>
  );
};
