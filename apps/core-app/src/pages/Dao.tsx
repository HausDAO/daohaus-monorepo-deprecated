import { useParams, Outlet, useLocation } from 'react-router-dom';
import { HausLayout, useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useDao } from '@daohaus/dao-context';
import { TXBuilder } from '@daohaus/tx-builder-feature';

export function Dao() {
  const { daochain, daoid } = useParams();
  const location = useLocation();
  const { provider, address } = useHausConnect();
  const { dao } = useDao();

  return (
    <TXBuilder
      chainId={daochain}
      provider={provider}
      safeId={dao?.safeAddress}
      daoId={daoid}
      appState={{ dao }}
    >
      <HausLayout
        pathname={location.pathname}
        navLinks={[
          { label: 'Home', href: `/${address}` },
          { label: 'DAO', href: `/molochv3/${daochain}/${daoid}` },
          {
            label: 'Proposals',
            href: `/molochv3/${daochain}/${daoid}/proposals`,
          },

          { label: 'Safes', href: `/molochv3/${daochain}/${daoid}/safes` },
          {
            label: 'Members',
            href: `/molochv3/${daochain}/${daoid}/members`,
          },
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
