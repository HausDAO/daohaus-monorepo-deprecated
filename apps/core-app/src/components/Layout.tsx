import React from 'react';
import { useParams } from 'react-router-dom';
import { HausLayout } from '@daohaus/daohaus-connect-feature';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { daochain, daoid } = useParams();

  console.log(daoid, daochain);

  return (
    <HausLayout
      navLinks={[
        { label: 'Home', href: `/dao/${daochain}/${daoid}` },
        { label: 'Proposals', href: `/dao/${daochain}/${daoid}/proposals` },
        { label: 'Vaults', href: `/dao/${daochain}/${daoid}/vaults` },
        { label: 'Members', href: `/dao/${daochain}/${daoid}/members` },
      ]}
      dropdownLinks={[{ label: 'Settings', href: '/settings' }]}
    >
      {children}
    </HausLayout>
  );
}

export default Layout;
