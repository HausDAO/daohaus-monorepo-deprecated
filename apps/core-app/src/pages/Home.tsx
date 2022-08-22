import { useEffect } from 'react';
import { HausLayout } from '@daohaus/daohaus-connect-feature';

export function Home() {
  useEffect(() => {
    window.location.href = 'https://hub.daohaus.fun';
  }, []);

  return <HausLayout>-</HausLayout>;
}

export default Home;
