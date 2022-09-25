import { useParams } from 'react-router-dom';
import { RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Bold, border, DataSm, Link, ParMd, Theme } from '@daohaus/ui';

import { CustomFormLego } from '../legos/config';

const ListContainer = styled.div`
  margin-top: 5rem;
`;

const ListItemContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-top: 1px ${({ theme }: { theme: Theme }) => theme.card.hoverBorder}
    solid;
`;

const ListItemLink = styled(Link)`
  width: 100%;
  color: unset;
  :hover {
    text-decoration: none;
  }
`;

const ListItemHoverContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-radius: ${border.radius};

  :hover {
    background: 1px ${({ theme }: { theme: Theme }) => theme.card.hoverBg};
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  word-wrap: break-word;
  max-width: 39rem;
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
        <ListItemContainer key={proposalLego.id}>
          <ListItemLink
            href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=${proposalLego.id}`}
          >
            <ListItemHoverContainer>
              <ListItem>
                <ParMd>
                  <Bold>{proposalLego.title}</Bold>
                </ParMd>
                <DataSm>{proposalLego.description}</DataSm>
              </ListItem>
              <StyledIcon />
            </ListItemHoverContainer>
          </ListItemLink>
        </ListItemContainer>
      ))}
    </ListContainer>
  );
};
