import { ComponentProps, ReactNode } from 'react';

import { DaoHausNav } from '../DaoHausNav/DaoHausNav';
import {
  AppSwitcher,
  Footer,
  MainLayout,
  NavigationTabs,
  NavigationTabsProps,
  widthQuery,
} from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.6rem 3rem;
  width: 100%;
  @media ${widthQuery.sm} {
    padding: 2rem;
  }
  .left-nav {
    @media ${widthQuery.sm} {
      width: 100%;
    }
  }
`;

export const HausLayout = ({
  navLinks,
  dropdownLinks,
  children,
  appNavLinks,
  leftNav,
}: NavigationTabsProps & {
  children: ReactNode;
  leftNav?: ReactNode;
  appNavLinks?: ComponentProps<typeof AppSwitcher>;
}) => {
  return (
    <OuterLayout>
      <Header>
        <div className="left-nav">
          {appNavLinks && <AppSwitcher {...appNavLinks} />}
          {leftNav}
        </div>
        <DaoHausNav />
      </Header>
      <NavigationTabs navLinks={navLinks} dropdownLinks={dropdownLinks} />
      <MainLayout>{children}</MainLayout>
      <Footer />
    </OuterLayout>
  );
};
