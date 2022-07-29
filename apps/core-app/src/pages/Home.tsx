import { HausLayout } from '@daohaus/daohaus-connect-feature';
import { FormBuilder } from '@daohaus/haus-form-builder';
import { MetadataConfig } from '../data/formLegos';

export function Home() {
  return (
    <HausLayout navLinks={[{ label: 'NavLink', href: '/' }]}>
      <FormBuilder form={MetadataConfig} onSubmit={() => console.log('test')} />
    </HausLayout>
  );
}

export default Home;
