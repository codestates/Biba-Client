import { combineReducers } from 'redux';

import { loginReducer, profileReducer, myReviewsReducer } from './user';
import { navBarReducer, modalReducer } from './nav';
import { getBeerReducer } from './getbeer';

export const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  myReviews: myReviewsReducer,
  navBar: navBarReducer,
  modal: modalReducer,
  getBeer: getBeerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
