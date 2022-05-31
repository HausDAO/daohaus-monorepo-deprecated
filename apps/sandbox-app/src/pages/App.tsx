import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import AppRouter from './AppRouter';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  padding: 2rem;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const App = () => {
  return (
    <Layout>
      <Header />
      <AppRouter />
    </Layout>
  );
};

export default App;
