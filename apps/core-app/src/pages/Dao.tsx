import { useParams, Outlet } from 'react-router-dom';
import { HausLayout } from '@daohaus/daohaus-connect-feature';
import { DaoContextProvider } from '../contexts/DaoContext';

export function Dao() {
  const { daochain, daoid } = useParams();

  return (
    <DaoContextProvider>
      <HausLayout
        navLinks={[
          { label: 'Home', href: `/molochv3/${daochain}/${daoid}` },
          {
            label: 'Proposals',
            href: `/molochv3/${daochain}/${daoid}/proposals`,
          },
          { label: 'Members', href: `/molochv3/${daochain}/${daoid}/members` },

          { label: 'Vaults', href: `/molochv3/${daochain}/${daoid}/vaults` },
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
    </DaoContextProvider>
  );
}

export default Dao;
