import { ReactNode } from 'react';

import { DaoHausNav } from '../DaoHausNav/DaoHausNav';
import { MainLayout, SubNav, SubNavProps } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';

export const HausLayout = ({
  navLinks,
  dropdownLinks,
  children,
}: SubNavProps & { children: ReactNode }) => {
  return (
    <OuterLayout>
      <DaoHausNav />
      <SubNav navLinks={navLinks} dropdownLinks={dropdownLinks} />
      <MainLayout>{children}</MainLayout>
    </OuterLayout>
  );
};
