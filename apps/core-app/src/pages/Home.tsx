import { HausLayout } from '@daohaus/daohaus-connect-feature';
import { FormBuilder, GovernanceProposal } from '@daohaus/haus-form-builder';

export function Home() {
  return (
    <HausLayout navLinks={[{ label: 'NavLink', href: '/' }]}>
      <FormBuilder
        form={GovernanceProposal}
        onSubmit={() => console.log('fart')}
      />
    </HausLayout>
  );
}

export default Home;
