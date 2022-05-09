import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown, ParMd } from '@daohaus/ui';
import { BiChevronDown } from 'react-icons/bi';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: header;
  width: 100%;
`;

// 1. logo dropdown with app navigation
// 2. connect wallet dropdown stub
//
// 3. profile component
// 4. Daos, proposal, people menu bar

const Header = () => {
  return (
    <HeaderContainer>
      <Dropdown
        trigger={<Button icon={BiChevronDown}>Hub</Button>}
        items={[
          {
            type: 'clickable',
            content: <ParMd>Summon</ParMd>,
          },
        ]}
      />
      <Button icon={BiChevronDown}>Connect</Button>
    </HeaderContainer>
  );
};

export default Header;
