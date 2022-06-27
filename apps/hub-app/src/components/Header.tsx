import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Dropdown,
  ParMd,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { ConnectButton } from '@daohaus/daohaus-connect-feature';
import { BiCommand, BiChevronDown } from 'react-icons/bi';
import { crimsonDarkA, crimsonDark } from '@radix-ui/colors';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: header;
  width: 100%;
  /* background: ${crimsonDark.crimson2}; */
`;

const StyledParMd = styled(ParMd)`
  max-width: 15rem;
`;

const StyledButton = styled(Button)`
  background-color: ${crimsonDarkA.crimsonA3};
  color: white;
  border-radius: 0.4rem;
  border: none;
  width: 100%;
  :hover {
    background-color: ${crimsonDarkA.crimsonA5};
    color: white;
    border: none;
  }
  :focus {
    background-color: ${crimsonDarkA.crimsonA5};
    color: white;
    border: none;
  }
  :active {
    background-color: ${crimsonDarkA.crimsonA5};
    color: white;
    border: none;
  }
  :disabled {
    background-color: ${crimsonDarkA.crimsonA1};
    color: white;
    border: none;
  }
`;

const StyledChevron = styled(BiChevronDown)`
  fill: ${crimsonDark.crimson9};
  :hover {
    fill: ${crimsonDark.crimson9};
  }
`;

const StyledCommand = styled(BiCommand)`
  fill: ${crimsonDark.crimson9};
  :hover {
    fill: ${crimsonDark.crimson9};
  }
`;

const Header = () => {
  const isSm = useBreakpoint(widthQuery.sm);
  return (
    <HeaderContainer>
      <Dropdown
        trigger={
          <StyledButton IconRight={StyledChevron} IconLeft={StyledCommand}>
            Hub
          </StyledButton>
        }
        items={[
          {
            type: 'clickable',
            content: <StyledParMd>Summon</StyledParMd>,
          },
        ]}
        width="4rem"
      />
      <ConnectButton isSm={isSm} />
    </HeaderContainer>
  );
};

export default Header;
