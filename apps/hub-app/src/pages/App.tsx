import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  gap: 0rem 0rem;
  display: grid;
  grid-template:
    'sidebar header aside' 9.6rem
    'sidebar body aside' 1fr / 1fr minmax(auto, 120rem) 1fr;
`;

const App = () => {
  return (
    <Layout>
      <Header />
      Hello
    </Layout>
  );
};

export default App;
