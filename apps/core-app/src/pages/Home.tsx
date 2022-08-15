import { HausLayout } from '@daohaus/daohaus-connect-feature';

export function Home() {
  return (
    <HausLayout navLinks={[{ label: 'NavLink', href: '/' }]}>Hi!</HausLayout>
  );
}

export default Home;
