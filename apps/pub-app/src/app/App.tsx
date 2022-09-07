import { DaoContextProvider } from '@daohaus/dao-context';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { Routes as RoutesDom, Route, useParams } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Publish } from '../pages/Publish';
import { Write } from '../pages/Write';
import { DaoWrapper } from '../components/DaoContainer';

export const App = () => {
  return (
    <RoutesDom>
      <Route path="/" element={'Enter network and daoid'} />
      <Route path="molochv3/:daochain/:daoid" element={<DaoWrapper />}>
        <Route index element={<Home />} />
        <Route path="publish" element={<Publish />} />
        <Route path="write" element={<Write />} />
      </Route>
    </RoutesDom>
  );
};
