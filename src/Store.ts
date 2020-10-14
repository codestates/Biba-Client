import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const composeEnhancers = compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);
