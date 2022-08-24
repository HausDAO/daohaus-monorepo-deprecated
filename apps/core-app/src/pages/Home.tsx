import { useLayoutEffect } from 'react';

export function Home() {
  useLayoutEffect(() => {
    window.location.href = 'https://hub.daohaus.fun';
  }, []);

  return null;
}

export default Home;
