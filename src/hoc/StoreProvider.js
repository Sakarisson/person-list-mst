import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import personList from '../models/personList';

export const StoreContext = createContext();

class StoreProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: personList.create(),
    };
  }

  render() {
    const { children } = this.props;
    const { store } = this.state;

    return (
      <StoreContext.Provider
        value={{
          store,
        }}
      >
        {children}
      </StoreContext.Provider>
    );
  }
}

StoreProvider.propTypes = {
  children: PropTypes.node,
};

StoreProvider.defaultProps = {
  children: null,
};

export default StoreProvider;
