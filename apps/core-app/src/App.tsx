import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { H1, SubNav } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';

export function App() {
  return (
    <OuterLayout>
      <DaoHausNav />
      <SubNav
        navLinks={[
          { label: 'Home', href: '/home' },
          { label: 'Proposals', href: '/proposals' },
          { label: 'Vaults', href: '/vaults' },
          { label: 'Members', href: '/members' },
        ]}
        moreLinks={[{ label: 'Settings', href: '/settings' }]}
      />
      <H1>Header!</H1>
    </OuterLayout>
  );
}

export default App;
