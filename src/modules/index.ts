import { combineReducers } from 'redux';

import {
  loginReducer,
  profileReducer,
  myReviewsReducer,
  confirmEmailReducer,
  confirmNicknameReducer,
} from './user';
import { modalReducer } from './nav';
import { getBeerReducer } from './getbeer';

export const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  myReviews: myReviewsReducer,
  confirmEmail: confirmEmailReducer,
  confirmNickname: confirmNicknameReducer,
  modal: modalReducer,
  getBeer: getBeerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
