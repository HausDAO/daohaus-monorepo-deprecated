import { HausLayout } from '@daohaus/daohaus-connect-feature';
import { FormBuilder } from '@daohaus/haus-form-builder';
import { Button } from '@daohaus/ui';

export function Home() {
  return (
    <HausLayout navLinks={[{ label: 'NavLink', href: '/' }]}>Hi!</HausLayout>
  );
}

export default Home;
