import styled from 'styled-components';
import { AppSwitcher } from '@daohaus/ui';
import { DaoHausNav } from '@daohaus/daohaus-connect-feature';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: header;
  width: 100%;
`;

const apps = {
  trigger: {
    name: 'Hub',
    url: 'https://hub.daohaus.fun/',
  },
  apps: [
    {
      name: 'Summoner',
      url: 'https://summon.daohaus.fun/',
    },
    {
      name: 'Docs',
      url: 'https://storybook.daohaus.fun/',
    },
  ],
};

const Header = () => {
  return (
    <HeaderContainer>
      <AppSwitcher {...apps} />
      <DaoHausNav />
    </HeaderContainer>
  );
};

export default Header;
