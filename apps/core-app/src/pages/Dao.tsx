import { useParams, Outlet } from 'react-router-dom';
import { HausLayout, useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useDao } from '../contexts/DaoContext';
import { TXBuilder } from '@daohaus/tx-builder-feature';

export function Dao() {
  const { daochain, daoid } = useParams();
  const { provider } = useHausConnect();
  const { dao } = useDao();

  console.log('dao.safeAddress', dao?.safeAddress);
  return (
    <TXBuilder
      chainId={daochain}
      provider={provider}
      safeId={dao?.safeAddress}
      daoId={daoid}
      appState={{}}
    >
      <HausLayout
        navLinks={[
          { label: 'Home', href: `/molochv3/${daochain}/${daoid}` },
          {
            label: 'Proposals',
            href: `/molochv3/${daochain}/${daoid}/proposals`,
          },
          { label: 'Vaults', href: `/molochv3/${daochain}/${daoid}/vaults` },
          { label: 'Members', href: `/molochv3/${daochain}/${daoid}/members` },
        ]}
        dropdownLinks={[
          {
            label: 'Settings',
            href: `/molochv3/${daochain}/${daoid}/settings`,
          },
        ]}
      >
        <Outlet />
      </HausLayout>
    </TXBuilder>
  );
}

export default Dao;
