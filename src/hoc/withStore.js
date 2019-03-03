import React from 'react';

import { StoreContext } from './StoreProvider';

const withStore = WrappedComponent => props => (
  <StoreContext.Consumer>
    {context => <WrappedComponent {...props} store={context.store} />}
  </StoreContext.Consumer>
);

export default withStore;
