import { combineReducers } from 'redux';

import { loginReducer } from './login';
import { searchBarReducer } from './searchbar';
import { getBeerReducer } from './getbeer';

export const rootReducer = combineReducers({
  login: loginReducer,
  searchBar: searchBarReducer,
  getBeer: getBeerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
