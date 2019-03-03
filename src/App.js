import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import StoreProvider from './hoc/StoreProvider';
import Routes from './components/Routes';
import Header from './components/Header';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 60em 1fr;
  grid-template-areas:
    '. header .'
    '. container .';
  padding-top: 5em;
`;

const InnerContainer = styled.div`
  grid-area: container;
`;

const App = () => (
  <Router>
    <StoreProvider>
      <Container>
        <Header />
        <InnerContainer>
          <Routes />
        </InnerContainer>
      </Container>
    </StoreProvider>
  </Router>
);

App.propTypes = {
  store: PropTypes.shape({
    persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default App;
