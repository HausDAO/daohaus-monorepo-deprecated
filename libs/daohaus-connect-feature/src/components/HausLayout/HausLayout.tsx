import { ReactNode } from 'react';

import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { MainLayout, SubNav, SubNavProps } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';

export const HausLayout = ({
  navLinks,
  moreLinks,
  children,
}: SubNavProps & { children: ReactNode }) => {
  return (
    <OuterLayout>
      <DaoHausNav />
      <SubNav navLinks={navLinks} moreLinks={moreLinks} />
      <MainLayout>{children}</MainLayout>
    </OuterLayout>
  );
};
