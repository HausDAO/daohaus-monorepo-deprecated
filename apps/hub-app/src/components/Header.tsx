import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown, DropdownMenuItem, ParMd } from '@daohaus/ui';
import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { BiCommand, BiChevronDown } from 'react-icons/bi';
import { indigoDark, amberDark } from '@radix-ui/colors';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: header;
  width: 100%;
`;

const StyledParMd = styled(ParMd)`
  max-width: 15rem;
`;

const StyledButton = styled(Button)`
  background-color: ${indigoDark.indigo3};
  color: white;
  border-radius: 0.4rem;
  border: none;

  :hover {
    background-color: ${indigoDark.indigo5};
    color: white;
    border: none;
  }

  :focus {
    background-color: ${indigoDark.indigo5};
    color: white;
    border: none;
  }

  :active {
    background-color: ${indigoDark.indigo5};
    color: white;
    border: none;
  }

  :disabled {
    background-color: ${indigoDark.indigo1};
    color: white;
    border: none;
  }
`;

const StyledChevron = styled(BiChevronDown)`
  fill: ${amberDark.amber9};
  :hover {
    fill: ${amberDark.amber9};
  }
`;

const StyledCommand = styled(BiCommand)`
  fill: ${amberDark.amber9};
  :hover {
    fill: ${amberDark.amber9};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Dropdown
        menuBg={indigoDark.indigo3}
        align="center"
        trigger={
          <StyledButton IconRight={StyledChevron} IconLeft={StyledCommand}>
            HUB
          </StyledButton>
        }
      >
        <DropdownMenuItem>
          <StyledParMd>Summon</StyledParMd>
        </DropdownMenuItem>
      </Dropdown>
      <DaoHausNav />
    </HeaderContainer>
  );
};

export default Header;
