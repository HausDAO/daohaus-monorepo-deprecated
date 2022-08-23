import { FormLego } from '@daohaus/haus-form-builder';
import { Bold, DataSm, Icon, Link, ParMd, Tag, Theme } from '@daohaus/ui';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GovernanceProposal } from '../data/customForms';
import { FORM } from '../legos/form';

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
`;

const StyledIcon = styled(RiArrowRightSLine)`
  fill: ${({ theme }: { theme: Theme }) => theme.primary};
  font-size: 3rem;
`;

const newProposals = [GovernanceProposal, FORM.SIGNAL];

console.log(JSON.stringify(FORM.SIGNAL));

export const NewProposalList = () => {
  const { daochain, daoid } = useParams();
  return (
    <ListContainer>
      {newProposals.map((proposalLego: FormLego) => (
        <ListItemContainer
          href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=${window.btoa(
            JSON.stringify(proposalLego)
          )}`}
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
