import { ReactNode } from 'react';

import { DaoHausNav } from '../DaoHausNav/DaoHausNav';
import {
  Footer,
  MainLayout,
  NavigationTabs,
  NavigationTabsProps,
} from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-nav {
    padding: 2.6rem 3rem;
  }
`;

export const HausLayout = ({
  navLinks,
  dropdownLinks,
  children,
  LeftNav,
}: NavigationTabsProps & { children: ReactNode }) => {
  return (
    <OuterLayout>
      <Header>
        <div className="left-nav">{LeftNav}</div>
        <DaoHausNav />
      </Header>
      <NavigationTabs navLinks={navLinks} dropdownLinks={dropdownLinks} />
      <MainLayout>{children}</MainLayout>
      <Footer />
    </OuterLayout>
  );
};
