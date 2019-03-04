import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import withStore from '../../hoc/withStore';

const Container = styled.div`
  grid-area: header;
  padding-bottom: 5em;
`;

const Header = () => (
  <Container>
    <Link to="/">Home</Link>
  </Container>
);

export default withStore(Header);
