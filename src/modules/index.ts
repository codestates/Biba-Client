import { combineReducers } from 'redux';

import { signinReducer } from './signin';
import { searchBarReducer } from './searchbar';
import { getBeerReducer } from './getbeer';

export const rootReducer = combineReducers({
  signin: signinReducer,
  searchBar: searchBarReducer,
  getBeer: getBeerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
