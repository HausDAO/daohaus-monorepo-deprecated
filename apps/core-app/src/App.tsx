import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { H1 } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';

export function App() {
  return (
    <OuterLayout>
      <DaoHausNav />
      <H1>Header!</H1>
    </OuterLayout>
  );
}

export default App;
