import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { H1, SubNav } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';

export function App() {
  return (
    <OuterLayout>
      <DaoHausNav />
      <SubNav />
      <H1>Header!</H1>
    </OuterLayout>
  );
}

export default App;
