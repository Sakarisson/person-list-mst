import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  grid-area: header;
`;

const Header = () => (
  <Container>
    <Link to="/">Home</Link>
  </Container>
);

Header.propTypes = {};

export default Header;
