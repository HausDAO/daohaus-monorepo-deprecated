import { HausLayout } from '@daohaus/daohaus-connect-feature';
import { FormBuilder, GovernanceProposal } from '@daohaus/haus-form-builder';

// const LeftCard = styled(Card)`
//   width: 100%;
//   min-width: 54rem;
//   max-width: 64rem;
//   height: 47rem;
//   @media ${widthQuery.md} {
//     max-width: 100%;
//     min-width: 0;
//   }
// `;

// const RightCard = styled(Card)`
//   width: 100%;
//   min-width: 38rem;
//   max-width: 45rem;
//   height: 77rem;
//   @media ${widthQuery.md} {
//     max-width: 100%;
//     min-width: 0;
//   }
// `;

// const exampleFormLego: FormLego = {
//   id: 'exampleFormLego',
//   title: 'Example Form',
//   subtitle: 'Example Subtitle',
//   fields: Object.values(StandardFields),
//   log: true,
// };

export function App() {
  return (
    <HausLayout
      navLinks={[
        { label: 'Home', href: '/home' },
        { label: 'Proposals', href: '/proposals' },
        { label: 'Vaults', href: '/vaults' },
        { label: 'Members', href: '/members' },
      ]}
    >
      <FormBuilder
        {...GovernanceProposal}
        onSubmit={() => console.log('fart')}
      />
    </HausLayout>
  );
}

export default App;
