import { useParams, Outlet } from 'react-router-dom';
import { HausLayout } from '@daohaus/daohaus-connect-feature';
import { DaoContextProvider } from '../contexts/DaoContext';

export function Dao() {
  const { daochain, daoid } = useParams();

  return (
    <DaoContextProvider>
      <HausLayout
        navLinks={[
          { label: 'Home', href: `/dao/${daochain}/${daoid}` },
          { label: 'Proposals', href: `/dao/${daochain}/${daoid}/proposals` },
          { label: 'Vaults', href: `/dao/${daochain}/${daoid}/vaults` },
          { label: 'Members', href: `/dao/${daochain}/${daoid}/members` },
        ]}
        dropdownLinks={[{ label: 'Settings', href: '/settings' }]}
      >
        <Outlet />
      </HausLayout>
    </DaoContextProvider>
  );
}

export default Dao;
