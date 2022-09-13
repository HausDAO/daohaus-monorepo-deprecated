import { DaoContextProvider } from '@daohaus/dao-context';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useParams } from 'react-router-dom';
import { InnerApp } from './InnerApp';

export const DaoWrapper = () => {
  const { daoid, daochain } = useParams();
  const { address } = useHausConnect();
  return (
    <DaoContextProvider address={address} daoid={daoid} daochain={daochain}>
      <InnerApp />;
    </DaoContextProvider>
  );
};
