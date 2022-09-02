import { useParams } from 'react-router-dom';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { DaoContextProvider } from '@daohaus/dao-context';
import Dao from './Dao';

export function DaoContainer() {
  const { daochain, daoid } = useParams();
  const { address } = useHausConnect();

  return (
    <DaoContextProvider address={address} daoid={daoid} daochain={daochain}>
      <Dao />
    </DaoContextProvider>
  );
}

export default Dao;
