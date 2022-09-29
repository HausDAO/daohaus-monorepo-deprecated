import { useParams, Outlet } from 'react-router-dom';
import { HausLayout, useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useDao } from '@daohaus/dao-context';
import { TXBuilder } from '@daohaus/tx-builder-feature';

export function Dao() {
  const { daochain, daoid } = useParams();
  const { provider } = useHausConnect();
  const { dao } = useDao();

  const apps = {
    trigger: {
      name: 'DAO Admin',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    apps: [
      {
        name: 'Summoner',
        url: 'https://summon.daohaus.fun/',
      },
      {
        name: 'Hub',
        url: 'https://hub.daohaus.fun/',
      },
      {
        name: 'Docs',
        url: 'https://storybook.daohaus.fun/',
      },
    ],
  };

  return (
    <TXBuilder
      chainId={daochain}
      provider={provider}
      safeId={dao?.safeAddress}
      daoId={daoid}
      appState={{ dao }}
    >
      <HausLayout
        navLinks={[
          { label: 'Home', href: `/molochv3/${daochain}/${daoid}` },
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
        appNavLinks={apps}
      >
        <Outlet />
      </HausLayout>
    </TXBuilder>
  );
}

export default Dao;
