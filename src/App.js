import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Person from './components/Person';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 60em 1fr;
  grid-template-areas: '. container .';
  padding-top: 5em;
`;

const InnerContainer = styled.div`
  grid-area: container;
`;

const App = ({ store }) => (
  <Container>
    <InnerContainer>
      {store.persons.map(person => (
        <Person person={person} key={person.id} />
      ))}
    </InnerContainer>
  </Container>
);

App.propTypes = {
  store: PropTypes.shape({
    persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default App;
