import { HausLayout } from '@daohaus/daohaus-connect-feature';
import { FormBuilder } from '@daohaus/haus-form-builder';
import { MetadataConfig } from '../data/formLegos';

const sampleDefaultData = {
  daoContract: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
  daoName: 'DAO Name here',
};

export function Home() {
  return (
    <HausLayout navLinks={[{ label: 'NavLink', href: '/' }]}>
      <FormBuilder
        form={MetadataConfig}
        onSubmit={() => console.log('test')}
        defaultValues={sampleDefaultData}
      />
    </HausLayout>
  );
}

export default Home;
