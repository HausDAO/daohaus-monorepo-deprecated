import { useDao, useProposals } from '@daohaus/dao-context';
import { HausLayout, useHausConnect } from '@daohaus/daohaus-connect-feature';
import { TXBuilder } from '@daohaus/tx-builder-feature';
import { Outlet, useParams } from 'react-router-dom';

export const InnerApp = () => {
  const { daoid, daochain } = useParams();
  const { dao } = useDao();
  const { chainId, provider } = useHausConnect();

  return (
    <TXBuilder
      chainId={chainId}
      provider={provider}
      safeId={dao?.safeAddress}
      daoId={daoid}
      appState={{}}
    >
      <HausLayout
        navLinks={[
          { label: 'Home', href: `/molochv3/${daochain}/${daoid}` },
          {
            label: 'Publication',
            href: `/molochv3/${daochain}/${daoid}/publish`,
          },
          { label: 'Article', href: `/molochv3/${daochain}/${daoid}/write` },
        ]}
      >
        <Outlet />
      </HausLayout>
    </TXBuilder>
  );
};
