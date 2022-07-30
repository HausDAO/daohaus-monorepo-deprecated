import { ReactNode } from 'react';

import { DaoHausNav } from '../DaoHausNav/DaoHausNav';
import { MainLayout, NavigationTabs, NavigationTabsProps } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';

export const HausLayout = ({
  navLinks,
  dropdownLinks,
  children,
}: NavigationTabsProps & { children: ReactNode }) => {
  return (
    <OuterLayout>
      <DaoHausNav />
      <NavigationTabs navLinks={navLinks} dropdownLinks={dropdownLinks} />
      <MainLayout>{children}</MainLayout>
    </OuterLayout>
  );
};
