import { useParams, Outlet } from 'react-router-dom';
import { HausLayout, useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useDao } from '@daohaus/dao-context';
import { TXBuilder } from '@daohaus/tx-builder-feature';
import { AppSwitcher } from '@daohaus/ui';

export function Dao() {
  const { daochain, daoid } = useParams();
  const { provider } = useHausConnect();
  const { dao } = useDao();

  const apps = {
    trigger: {
      name: 'Core App',
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
        LeftNav={<AppSwitcher {...apps} />}
      >
        <Outlet />
      </HausLayout>
    </TXBuilder>
  );
}

export default Dao;
