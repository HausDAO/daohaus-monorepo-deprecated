import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { HomeDashboard } from '../components/HomeDashboard';
import { HomeNotConnected } from '../components/HomeNotConnected';

export function Home() {
  const { isConnected } = useHausConnect();

  return isConnected ? <HomeDashboard /> : <HomeNotConnected />;
}

export default Home;
