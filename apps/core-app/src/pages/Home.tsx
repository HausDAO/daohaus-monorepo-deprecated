import { HausLayout } from '@daohaus/daohaus-connect-feature';
import { FormBuilder } from '@daohaus/haus-form-builder';
import { GovernanceProposal } from '../data/forms';

export function Home() {
  return (
    <HausLayout navLinks={[{ label: 'NavLink', href: '/' }]}>
      <FormBuilder
        form={GovernanceProposal}
        onSubmit={() => console.log('test')}
      />
    </HausLayout>
  );
}

export default Home;
