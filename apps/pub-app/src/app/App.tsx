import { Routes as RoutesDom, Route, Outlet } from 'react-router-dom';
import { Home } from '../pages/Home';
import { OutletWrapper } from '../pages/OutletWrapper';
import { Publish } from '../pages/Publish';
import { Write } from '../pages/Write';

export const App = () => {
  return <Routes />;
};

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={'Enter network and daoid'} />
      <Route path="molochv3/:daochain/:daoid" element={<OutletWrapper />}>
        <Route path="home" element={<Home />} />
        <Route path="publish" element={<Publish />} />
        <Route path="write" element={<Write />} />
      </Route>
    </RoutesDom>
  );
};

// const navLinks = [
//           { label: 'Home', href: `/molochv3/${daochain}/${daoid}` },
//           {
//             label: 'Proposals',
//             href: `/molochv3/${daochain}/${daoid}/proposals`,
//           },
//           { label: 'Vaults', href: `/molochv3/${daochain}/${daoid}/vaults` },
//           {
//             label: 'Members',
//             href: `/molochv3/${daochain}/${daoid}/members`,
//           },
//         ]
