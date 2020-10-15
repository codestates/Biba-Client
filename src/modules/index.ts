import { combineReducers } from 'redux';

import { signinReducer } from './signin';
import { searchBarReducer } from './searchbar';

export const rootReducer = combineReducers({
  signin: signinReducer,
  searchBar: searchBarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
